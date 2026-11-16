export type MeetingInput = {
  subject: string;
  kind: "company" | "person";
  domain: string;
  meetingAt: string;
  goal: string;
  language: "en" | "zh";
};
export type ResearchWindow = { start: string; end: string; meetingAt: string; asOf: string };
export type Source = {
  id: string; title: string; url: string; domain: string; content: string;
  publishedAt: string | null; retrievedAt: string; primary: boolean;
  status: "eligible" | "excluded";
  reason: string | null;
  extracted: boolean;
};
export type Finding = {
  id: string; title: string; fact: string; relevance: string;
  category: "launch" | "leadership" | "business" | "other";
  sourceIds: string[];
  evidence: { sourceId: string; quote: string }[];
  evidenceLevel: "primary-source" | "reported";
};
export type Brief = {
  id: string; mode: "demo" | "live"; meeting: MeetingInput; window: ResearchWindow;
  headline: string; summary: string;
  findings: Finding[];
  questions: { question: string; why: string; sourceIds: string[] }[];
  gaps: string[]; sources: Source[];
  trace: { stage: string; detail: string; durationMs: number }[];
  metrics: { durationMs: number; searchCalls: number; extractCalls: number; llmCalls: number; inputTokens: number | null; outputTokens: number | null; tavilyCredits: number | null };
  generatedAt: string;
};
export type ResearchEvent = { type: "progress"; stage: string; detail: string } | { type: "result"; brief: Brief } | { type: "error"; message: string };
export type RuntimeConfig = { tavilyKey: string; llmKey: string; llmBaseUrl: string; llmModel: string; apiToken?: string };
