# HackCulture submission copy

Status: prepared text; final submission not yet confirmed.

## Project name
BriefSignal

## Primary theme

Theme: AI Agents & Intelligent Systems.

Problem Statement (appears after selecting Theme): Tavily Research Agent.

This is a single Tavily-only project. Leave the additional Tavily-integration checkboxes empty and select NA (not applied) for the second project.

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
17 offline core/pipeline tests, 3 browser scenarios, TypeScript checks and the production build passed. Real company and person browser runs completed through Tavily Search/Extract, Gemini 3.1 Flash-Lite synthesis, citation validation and one-page PDF export. Latest observed durations were 12.1 and 9.0 seconds; earlier timeouts and HTTP 503 failures are disclosed. The offline demo company is fictional. Citation validation checks provenance; human review remains necessary for date inference and semantic support. No real-world accuracy or time-saving percentage is claimed.

## AI assistance and reused components
OpenAI Codex assisted with implementation, tests and documentation. The Sites Vinext starter is reused infrastructure. BriefSignal's core logic, product UI, fixtures and materials were created for this event on 2026-11-16. No competing project code was copied.

## Links / uploads
Public repository: https://github.com/sutinah12-hash/briefsignal-global-ai-hackathon

Recorded demo: https://github.com/sutinah12-hash/briefsignal-global-ai-hackathon/blob/main/submission/BriefSignal-demo.webm

The 56-second captioned recording shows real UI interactions with the explicitly labeled fictional example. It does not establish live-provider operation.

Upload `BriefSignal-pitch.pptx` or `BriefSignal-pitch.pdf` according to the form's accepted formats. The one-page sample is `BriefSignal-sample-brief.pdf`. A deployed application and demonstration video are optional under the supplied instructions. Exact form labels and the pending save status are recorded in `FORM-STATUS.md`.

## Final gate
Before submitting: perform a real provider run or keep the limitations fully disclosed; verify the repo is public; check deck/download links; confirm team details; and record the actual saved/submitted receipt. Do not mark this file submitted merely because it is committed to GitHub.
