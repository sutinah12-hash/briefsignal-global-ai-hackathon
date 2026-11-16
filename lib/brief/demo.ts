import { getWindow, normalizeSources } from "./core.ts";
import type { Brief, MeetingInput } from "./types.ts";

export const demoMeeting: MeetingInput = {
  subject: "Northstar Robotics", kind: "company", domain: "northstar.example",
  meetingAt: "2026-11-17T02:00:00.000Z", goal: "Explore a pilot partnership for warehouse automation.", language: "en",
};
export function createDemo(): Brief {
  const now = new Date("2026-11-16T06:00:00.000Z");
  const window = getWindow(demoMeeting.meetingAt, now);
  const sources = normalizeSources([
    { title: "Northstar opens its Atlas developer platform", url: "https://northstar.example/news/atlas-platform", published_date: "2026-11-12T09:00:00Z", content: "Northstar Robotics opened the Atlas developer platform to integration partners on November 12. The release includes a simulation environment and a warehouse connector SDK. The first partner cohort will help test multi-vendor deployments." },
    { title: "Northstar appoints a Head of Partnerships", url: "https://northstar.example/news/partnerships-lead", published_date: "2026-11-08T10:00:00Z", content: "Northstar Robotics appointed Maya Chen as Head of Partnerships. She will lead the company's partner onboarding and pilot programs. The announcement does not specify regional availability." },
    { title: "Warehouse pilot moves into a second phase", url: "https://industry.example/northstar-pilot", published_date: "2026-10-30T11:00:00Z", content: "Northstar Robotics expanded its warehouse pilot into a second phase with two logistics operators. The companies have not published a deployment schedule or independently audited performance results." },
    { title: "Northstar announces a seed round", url: "https://northstar.example/news/seed-round", published_date: "2026-10-05T09:00:00Z", content: "Northstar Robotics announced a seed funding round to build warehouse automation tools." },
    { title: "Northstar Robotics enterprise pricing", url: "https://northstar.example/pricing", content: "Northstar Robotics offers enterprise pricing. Contact the sales team for current terms." },
    { title: "Northstar plans a future launch", url: "https://news.example/northstar-future", published_date: "2026-11-19T09:00:00Z", content: "Northstar Robotics launched a new mobile robot. This deliberately future-dated fixture must not enter the brief." },
  ], demoMeeting, window);
  const findings: Brief["findings"] = [
    { id: "F1", category: "launch", title: "A new opening for integration partners", fact: "Northstar opened the Atlas developer platform, including a simulator and warehouse connector SDK.", relevance: "Use the meeting to test whether your integration can join the first partner cohort.", sourceIds: ["S1"], evidence: [{ sourceId: "S1", quote: "Northstar Robotics opened the Atlas developer platform to integration partners on November 12." }], evidenceLevel: "primary-source" },
    { id: "F2", category: "leadership", title: "Partner programs have a new owner", fact: "Maya Chen was appointed Head of Partnerships, with responsibility for onboarding and pilots.", relevance: "Clarify who owns pilot decisions and which onboarding steps your team should prepare for.", sourceIds: ["S2"], evidence: [{ sourceId: "S2", quote: "Northstar Robotics appointed Maya Chen as Head of Partnerships." }], evidenceLevel: "primary-source" },
    { id: "F3", category: "business", title: "A pilot is expanding; outcomes remain unclear", fact: "An industry report describes a second pilot phase with two logistics operators. No audited performance results were published.", relevance: "Ask for baseline metrics and a measurable definition of pilot success before discussing rollout.", sourceIds: ["S3"], evidence: [{ sourceId: "S3", quote: "Northstar Robotics expanded its warehouse pilot into a second phase with two logistics operators." }], evidenceLevel: "reported" },
  ];
  return { id: "demo-northstar", mode: "demo", meeting: { ...demoMeeting }, window,
    headline: "A timely conversation about partnership",
    summary: "A platform launch, a new partnerships lead, and an expanding pilot give you three concrete starting points.", findings,
    questions: [
      { question: "What would qualify us for the first Atlas partner cohort?", why: "Connect the platform launch to a concrete next step.", sourceIds: ["S1"] },
      { question: "Who will own onboarding and the go/no-go decision for a pilot?", why: "Establish a decision owner while the team is evolving.", sourceIds: ["S2"] },
      { question: "Which baseline and success metrics should we agree on before a pilot?", why: "Published results do not yet establish performance.", sourceIds: ["S3"] },
    ],
    gaps: ["Pricing could not be dated and was excluded from the recent-developments section.", "Regional availability, pilot timelines, and audited outcomes still need confirmation.", "This is a fictional, fixed-date demo. It demonstrates the workflow without making external API calls."], sources,
    trace: [
      { stage: "context", detail: "Loaded a fictional company and a fixed meeting time.", durationMs: 0 },
      { stage: "search", detail: "Loaded 6 synthetic source records. No Tavily request was made.", durationMs: 0 },
      { stage: "filter", detail: "Kept 3 dated sources; excluded 1 old, 1 undated, and 1 future record.", durationMs: 0 },
      { stage: "brief", detail: "Loaded 3 authored findings with traceable excerpts. No LLM request was made.", durationMs: 0 },
    ], metrics: { durationMs: 0, searchCalls: 0, extractCalls: 0, llmCalls: 0, inputTokens: null, outputTokens: null, tavilyCredits: 0 }, generatedAt: now.toISOString() };
}
