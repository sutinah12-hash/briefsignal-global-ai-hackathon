# HackCulture submission copy

Status: prepared text; final submission not yet confirmed.

## Project name
BriefSignal

## Primary theme
Tavily Research Agent

## Optional Bifrost / combined challenge
Not selected. This prototype uses Tavily and a configurable model endpoint; no Bifrost integration is claimed.

## Tagline
A source-backed meeting brief with the evidence behind every signal.

## Problem
Meeting preparation requires finding recent company or person updates, deciding which matter, and checking whether an AI summary is grounded. Search results are scattered, dates can be missing, and a confident summary can hide stale or unsupported information.

## Solution
BriefSignal takes a company or person, a scheduled meeting time, and a conversation goal. It researches the preceding 30 days and produces a concise printable briefing with recent developments, source excerpts, goal-specific interpretations, and discussion questions. An evidence ledger also shows excluded sources and why they were not used.

## How AI and Tavily are used
Tavily Search discovers launches, leadership changes, and business developments through three research queries. Tavily Extract reads up to three eligible source pages. A configurable language model selects relevant evidence and produces structured findings, meeting implications, open questions, and gaps. Deterministic validation rejects unresolved citations and quotations absent from the supplied evidence. AI interpretation is visibly separated from reported facts.

## Technical architecture
React/TypeScript interface → streamed server endpoint → Tavily Search → date and URL checks → Tavily Extract → model synthesis → citation/excerpt validation → one-page briefing, evidence ledger, JSON/Markdown/PDF exports. The server runs on a Vinext/Vite Cloudflare Worker stack. Keys are server-only. The prototype does not require a database.

## Differentiation
The key interaction is inspecting both the evidence used and the evidence rejected. BriefSignal applies a meeting-relative time window, avoids future information, shows uncertainty rather than filling gaps, and connects every discussion starter to an accepted source. Its explicit demo/live separation makes the prototype easy to inspect without misrepresenting generated examples as live research.

## Validation and current limitations
16 offline core/pipeline tests, 3 browser scenarios, TypeScript checks and the production build passed. The printable sample is one A4 page. Live provider validation is pending configuration. The demo company is fictional. Citation validation checks provenance, not independent truth or semantic entailment. No real-world accuracy or time-saving percentage is claimed.

## AI assistance and reused components
OpenAI Codex assisted with implementation, tests and documentation. The Sites Vinext starter is reused infrastructure. BriefSignal's core logic, product UI, fixtures and materials were created for this event on 2026-11-16. No competing project code was copied.

## Links / uploads
Use the verified public repository URL in `repository.json` after publication. Upload `BriefSignal-pitch.pptx` or `BriefSignal-pitch.pdf` according to the form's accepted formats. The one-page sample is `BriefSignal-sample-brief.pdf`. A deployed application and demonstration video are optional under the supplied instructions.

## Final gate
Before submitting: perform a real provider run or keep the limitations fully disclosed; verify the repo is public; check deck/download links; confirm team details; and record the actual saved/submitted receipt. Do not mark this file submitted merely because it is committed to GitHub.
