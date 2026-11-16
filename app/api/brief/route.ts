import { env } from "cloudflare:workers";
import { BriefError, validateInput } from "@/lib/brief/core";
import { research } from "@/lib/brief/research";
import type { ResearchEvent, RuntimeConfig } from "@/lib/brief/types";

let activeRequests = 0;
const config = (): RuntimeConfig => {
  const e = env as unknown as Record<string, string | undefined>;
  return { tavilyKey: e.TAVILY_API_KEY ?? "", llmKey: e.LLM_API_KEY ?? e.OPENAI_API_KEY ?? "", llmBaseUrl: e.LLM_BASE_URL ?? "https://api.openai.com/v1", llmModel: e.LLM_MODEL ?? "gpt-4.1-mini", apiToken: e.BRIEF_API_TOKEN };
};
export async function GET() {
  const c = config();
  return Response.json({ tavilyConfigured: !!c.tavilyKey, modelConfigured: !!c.llmKey, tokenRequired: !!c.apiToken, liveReady: !!c.tavilyKey && !!c.llmKey });
}
export async function POST(request: Request) {
  try {
    const c = config();
    if (request.headers.get("origin") !== new URL(request.url).origin) throw new BriefError("Only requests from this app are accepted.", 403);
    if (c.apiToken && request.headers.get("authorization") !== `Bearer ${c.apiToken}`) throw new BriefError("Enter the app access token in Connections.", 401);
    if (Number(request.headers.get("content-length") ?? 0) > 8192) throw new BriefError("Meeting details are too large.", 413);
    const text = await request.text();
    if (text.length > 8192) throw new BriefError("Meeting details are too large.", 413);
    let raw: unknown;
    try { raw = JSON.parse(text); } catch { throw new BriefError("Invalid meeting JSON."); }
    const input = validateInput(raw);
    if (!c.tavilyKey || !c.llmKey) throw new BriefError("Configure TAVILY_API_KEY and LLM_API_KEY in .dev.vars, then restart the app. You can explore the demo now.", 503);
    if (activeRequests >= 2) throw new BriefError("Two briefings are already running. Try again shortly.", 429);
    activeRequests++;
    const aborter = new AbortController();
    const signal = AbortSignal.any([request.signal, aborter.signal]);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const emit = (event: ResearchEvent) => { if (!signal.aborted) controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`)); };
        try { const brief = await research(input, c, emit, { signal }); emit({ type: "result", brief }); }
        catch (error) { emit({ type: "error", message: error instanceof BriefError ? error.message : "Research could not finish. Please retry." }); }
        finally { activeRequests--; if (!signal.aborted) controller.close(); }
      }, cancel() { aborter.abort(); },
    });
    return new Response(stream, { headers: { "content-type": "application/x-ndjson", "cache-control": "no-store", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    return Response.json({ error: error instanceof BriefError ? error.message : "Unable to prepare research." }, { status: error instanceof BriefError ? error.status : 500 });
  }
}
