import type { Brief, Finding, MeetingInput, ResearchWindow, Source } from "./types.ts";

const DAY = 86_400_000;
export class BriefError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export function validateInput(raw: unknown, now = new Date()): MeetingInput {
  if (!raw || typeof raw !== "object") throw new BriefError("Meeting details are required.");
  const r = raw as Record<string, unknown>;
  const subject = typeof r.subject === "string" ? r.subject.trim() : "";
  const goal = typeof r.goal === "string" ? r.goal.trim() : "";
  if (subject.length < 2 || subject.length > 120) throw new BriefError("Enter a company or person's name (2–120 characters).");
  if (goal.length < 5 || goal.length > 500) throw new BriefError("Add a meeting goal (5–500 characters).");
  if (r.kind !== "company" && r.kind !== "person") throw new BriefError("Choose company or person.");
  if (r.language !== "en" && r.language !== "zh") throw new BriefError("Choose English or Chinese.");
  if (typeof r.meetingAt !== "string" || !/(Z|[+-]\d{2}:\d{2})$/.test(r.meetingAt)) throw new BriefError("Meeting time must include a timezone.");
  const time = Date.parse(r.meetingAt);
  if (!Number.isFinite(time)) throw new BriefError("Enter a valid meeting date and time.");
  if (time > now.getTime() + 30 * DAY || time < now.getTime() - 365 * DAY) throw new BriefError("Choose a meeting between one year ago and 30 days ahead.");
  let domain = typeof r.domain === "string" ? r.domain.trim().toLowerCase() : "";
  if (domain) {
    try {
      const url = new URL(domain.includes("://") ? domain : `https://${domain}`);
      domain = url.hostname.replace(/^www\./, "");
      if (!safePublicUrl(`https://${domain}`)) throw new Error();
    } catch { throw new BriefError("Use a public company domain, such as example.com."); }
  }
  return { subject, kind: r.kind, domain, meetingAt: new Date(time).toISOString(), goal, language: r.language };
}

// Meeting-relative window; never allow information that did not exist at research time.
export function getWindow(meetingAt: string, now = new Date()): ResearchWindow {
  const meeting = new Date(meetingAt);
  return { start: new Date(meeting.getTime() - 30 * DAY).toISOString(), end: new Date(Math.min(meeting.getTime(), now.getTime())).toISOString(), meetingAt: meeting.toISOString(), asOf: now.toISOString() };
}
export function safePublicUrl(value: string): boolean {
  try {
    const u = new URL(value), h = u.hostname.toLowerCase();
    return ["https:", "http:"].includes(u.protocol) && !u.username && !u.password &&
      !u.port && h.includes(".") && !h.endsWith(".local") && !h.endsWith(".internal") && !h.endsWith(".localhost") &&
      !/^\d+\.\d+\.\d+\.\d+$/.test(h) && !h.includes(":") && h !== "localhost";
  } catch { return false; }
}
export function canonicalUrl(value: string): string {
  const u = new URL(value); u.hash = "";
  for (const key of [...u.searchParams.keys()]) if (/^(utm_|fbclid|gclid)/i.test(key)) u.searchParams.delete(key);
  return u.toString().replace(/\/$/, "");
}
export function normalizeSources(results: unknown[], input: MeetingInput, window: ResearchWindow): Source[] {
  const seen = new Set<string>();
  return results.flatMap((raw) => {
    if (!raw || typeof raw !== "object") return [];
    const r = raw as Record<string, unknown>;
    if (typeof r.url !== "string" || !safePublicUrl(r.url)) return [];
    const url = canonicalUrl(r.url);
    if (seen.has(url)) return [];
    seen.add(url);
    const domain = new URL(url).hostname.replace(/^www\./, "");
    const primary = !!input.domain && (domain === input.domain || domain.endsWith(`.${input.domain}`));
    const published = typeof r.published_date === "string" ? r.published_date : "";
    const stamp = Date.parse(published);
    const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(published);
    const uncertainTime = dateOnly && (published === window.start.slice(0, 10) || published === window.end.slice(0, 10));
    let reason: string | null = !Number.isFinite(stamp) ? "Publication date unavailable" : uncertainTime ? "Boundary date has no publication time" : stamp < Date.parse(window.start) ? "Published before the 30-day window" : stamp > Date.parse(window.end) ? "Published after the research cutoff" : null;
    const title = typeof r.title === "string" ? r.title.slice(0, 250) : domain;
    const content = typeof r.content === "string" ? r.content.slice(0, 6000) : "";
    if (!content.trim()) reason = reason ?? "No readable evidence";
    // A domain is a disambiguation hint, not proof that every mention is relevant.
    const tokens = input.subject.toLowerCase().split(/\s+/).filter(t => t.length >= 3);
    if (!primary && tokens.length && !tokens.some(t => `${title} ${content}`.toLowerCase().includes(t))) reason = reason ?? "No matching entity in the retrieved text";
    return [{ id: `S${seen.size}`, title, url, domain, content, publishedAt: Number.isFinite(stamp) ? new Date(stamp).toISOString() : null, retrievedAt: window.asOf, primary, status: reason ? "excluded" as const : "eligible" as const, reason, extracted: false }];
  });
}
const cleanText = (v: unknown, max: number) => typeof v === "string" ? v.trim().slice(0, max) : "";
const normalized = (v: string) => v.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();

// Reject unresolvable citations and unverifiable quotations. This validates provenance,
// not semantic entailment; a human still needs to assess source accuracy.
export function groundSynthesis(raw: unknown, sources: Source[]) {
  if (!raw || typeof raw !== "object") throw new BriefError("The model returned an invalid briefing. Try again.", 502);
  const r = raw as Record<string, unknown>;
  const eligible = new Map(sources.filter(s => s.status === "eligible").map(s => [s.id, s]));
  const findings: Finding[] = [];
  let rejected = 0;
  for (const rawFinding of Array.isArray(r.findings) ? r.findings.slice(0, 3) : []) {
    if (!rawFinding || typeof rawFinding !== "object") { rejected++; continue; }
    const f = rawFinding as Record<string, unknown>;
    const evidence = (Array.isArray(f.evidence) ? f.evidence : []).flatMap((e) => {
      if (!e || typeof e !== "object") return [];
      const source = eligible.get(e.sourceId);
      const quote = cleanText(e.quote, 600);
      return source && quote.length >= 20 && normalized(source.content).includes(normalized(quote)) ? [{ sourceId: source.id, quote }] : [];
    });
    const title = cleanText(f.title, 100), fact = cleanText(f.fact, 300), relevance = cleanText(f.relevance, 220);
    if (!evidence.length || evidence.length !== (Array.isArray(f.evidence) ? f.evidence.length : 0) || !title || !fact || !relevance) { rejected++; continue; }
    const sourceIds = [...new Set(evidence.map(e => e.sourceId))];
    findings.push({ id: `F${findings.length + 1}`, title, fact, relevance, category: ["launch", "leadership", "business", "other"].includes(String(f.category)) ? f.category as Finding["category"] : "other", sourceIds, evidence, evidenceLevel: sourceIds.some(id => eligible.get(id)?.primary) ? "primary-source" : "reported" });
  }
  const used = new Set(findings.flatMap(f => f.sourceIds));
  const questions = (Array.isArray(r.questions) ? r.questions : []).slice(0, 3).flatMap(q => {
    if (!q || typeof q !== "object") return [];
    const question = cleanText(q.question, 200), why = cleanText(q.why, 180);
    const ids: string[] = [...new Set<string>((Array.isArray(q.sourceIds) ? q.sourceIds : []).filter((id: unknown): id is string => typeof id === "string" && used.has(id)))];
    return question && why && ids.length ? [{ question, why, sourceIds: ids }] : [];
  });
  const gaps = (Array.isArray(r.gaps) ? r.gaps : []).map(g => cleanText(g, 220)).filter(Boolean).slice(0, 4);
  if (rejected) gaps.push(`${rejected} proposed finding(s) omitted because the quoted evidence could not be verified.`);
  if (!findings.length) gaps.push("No sufficiently grounded findings. Broaden the entity context or check again later.");
  // Headline and summary are deliberately neutral so uncited model prose cannot add facts.
  return { headline: "Your meeting, in context", summary: `${findings.length} recent development${findings.length === 1 ? "" : "s"} with traceable source excerpts. Discussion points are suggestions, not verified predictions.`, findings, questions, gaps };
}

export function toMarkdown(b: Brief): string {
  const lines = [`# BriefSignal · ${b.meeting.subject}`, b.mode === "demo" ? "> DEMO — synthetic scenario, no live research performed." : `> Researched ${b.generatedAt}. Source-backed does not mean independently verified.`, "", `Meeting: ${b.meeting.meetingAt}`, `Goal: ${b.meeting.goal}`, `Evidence window: ${b.window.start} to ${b.window.end}`, "", "## Recent developments"];
  for (const f of b.findings) lines.push(`### ${f.title}`, f.fact, `Relevance (AI interpretation): ${f.relevance}`, `Sources: ${f.sourceIds.join(", ")}`, "");
  lines.push("## Discussion questions");
  b.questions.forEach(q => lines.push(`- ${q.question} (${q.sourceIds.join(", ")})`));
  lines.push("", "## Open questions & limitations", ...b.gaps.map(g => `- ${g}`), "", "## Sources");
  b.sources.filter(s => b.findings.some(f => f.sourceIds.includes(s.id))).forEach(s => lines.push(`- [${s.id}] [${s.title}](${s.url}) · ${s.publishedAt ?? "date unknown"}`));
  return lines.join("\n");
}
