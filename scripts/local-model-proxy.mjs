import fs from "node:fs/promises";
import http from "node:http";
import https from "node:https";

// Optional development-only bridge: workerd does not inherit Node's proxy agent.
// No keys are stored here and the upstream host cannot be selected by a request.
export async function startLocalModelProxy() {
  let settings;
  try { settings = JSON.parse(await fs.readFile(".briefsignal.local.json", "utf8")); }
  catch (error) { if (error.code === "ENOENT") return; throw error; }
  const proxy = new URL(settings.proxyUrl);
  if (!["http:", "https:"].includes(proxy.protocol) || !["127.0.0.1", "localhost", "[::1]"].includes(proxy.hostname) || proxy.username || proxy.password) {
    throw new Error("Local development proxy must be an unauthenticated loopback URL.");
  }
  const port = settings.modelPort ?? 8790;
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("Invalid local model bridge port.");
  const agent = new https.Agent({ proxyEnv: { https_proxy: proxy.href }, keepAlive: true });
  const route = "/v1beta/openai/chat/completions";
  const server = http.createServer(async (request, response) => {
    response.setHeader("cache-control", "no-store");
    if (request.method !== "POST" || request.url !== route) { response.writeHead(404).end(); return; }
    if (request.headers.origin || !request.headers.authorization?.startsWith("Bearer ")) { response.writeHead(403).end(); return; }
    const chunks = []; let bytes = 0;
    try {
      for await (const chunk of request) {
        bytes += chunk.length;
        if (bytes > 128 * 1024) { response.writeHead(413).end(); return; }
        chunks.push(chunk);
      }
      const upstream = https.request(`https://generativelanguage.googleapis.com${route}`, {
        method: "POST", agent, timeout: 90_000,
        headers: { "content-type": "application/json", authorization: request.headers.authorization },
      }, result => {
        response.writeHead(result.statusCode ?? 502, { "content-type": "application/json" });
        result.on("error", () => response.destroy());
        result.pipe(response);
      });
      upstream.on("timeout", () => upstream.destroy(new Error("Model bridge timeout")));
      upstream.on("error", () => {
        if (response.headersSent) response.destroy();
        else response.writeHead(502).end('{"error":{"message":"Local model proxy could not reach Google."}}');
      });
      response.on("close", () => { if (!response.writableFinished) upstream.destroy(); });
      upstream.end(Buffer.concat(chunks));
    } catch { if (!response.headersSent) response.writeHead(400).end(); }
  });
  server.requestTimeout = 95_000;
  await new Promise((resolve, reject) => { server.once("error", reject); server.listen(port, "127.0.0.1", resolve); });
  server.unref();
  console.log(`Local Gemini proxy ready at http://127.0.0.1:${port}/v1beta/openai`);
}
