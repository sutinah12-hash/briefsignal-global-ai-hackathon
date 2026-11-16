# Live validation

Status: **Two real browser-to-brief case types completed**, using Tavily Search/Extract and Gemini 3.1 Flash-Lite on 2026-11-16. These are development observations, not a semantic-accuracy benchmark or availability guarantee.

Before a complete pipeline run, confirm that Tavily pay-as-you-go and auto-upgrade are off and the model account has a verified free tier or an active promotional grant, with no paid fallback or automatic recharge authorized for this task. Keep keys in the ignored `.dev.vars` file.

Account setup check on 2026-11-16: the authenticated OpenAI account did not expose an API-credit activation option in either ChatGPT billing or API Platform billing, and no active API grant was observed. No credits were purchased and no model calls were made. The existence of an eligible subscription plan or an official benefit guide is not evidence that this account received a grant.

Tavily's Researcher free plan showed 1,000 credits remaining before testing. Auto-upgrade was disabled; both auto-upgrade and pay-as-you-go were checked again after reloading and were off. A dedicated project key was configured in the ignored local file.

The user subsequently created a Gemini auth key manually. Its exact project was verified in Google AI Studio as Free tier with no paid billing linked. After correcting an inaccurate key copy and configuring the existing local HTTP proxy, the model returned HTTP 200 and valid JSON. No credits were purchased, paid plan activated, or auto-recharge enabled.

## Observed provider probes — 2026-11-16

- Search: HTTP 200, basic news search for recent OpenAI announcements, date filter 2026-10-18 through 2026-11-16, three returned dated sources. The response reported **1 credit**.
- Returned sources included [OpenAI's ChatGPT Wallet announcement](https://openai.com/index/introducing-chatgpt-wallet), published 2026-11-13; [PPC Land coverage](https://ppc.land/openai-hands-its-ai-agents-a-wallet-without-the-real-card-number-in-it), published 2026-11-14; and [TechCrunch coverage](https://techcrunch.com/2026/11/10/openai-rolls-out-new-business-profiles-making-chatgpt-just-a-little-bit-more-like-google), published 2026-11-10. Dates here are provider-returned publication metadata, not independently verified event dates.
- Extract: HTTP 200 for the OpenAI announcement above; one successful result, zero failed results, 13,875 returned characters. The response reported **0 credits**; this is a provider report, not a promise about extraction pricing.
- These probes establish credential acceptance and functioning search/extraction endpoints. They do not establish model synthesis, semantic accuracy, or full pipeline operation. Raw provider responses are retained only in ignored local working files, not republished in the repository.

For each real run, record: entity, official domain, meeting timestamp with timezone, research timestamp, returned source URLs/publication dates, accepted and excluded findings, manually checked support, errors, wall time, and provider-reported usage. Do not commit private meeting context or credentials.

Recommended cases: a company with recent launches; a person with an unambiguous public affiliation; a namesake entity; a quiet company with no recent evidence; a past meeting. Inspect each citation and test whether the quoted passage actually supports the full factual statement.

Only update this file with observed results. Offline fixtures must not be reported as live integration evidence.

## Completed company case

- Subject: OpenAI; domain hint: `openai.com`.
- Illustrative meeting: 2026-11-17 10:00 Asia/Shanghai (`2026-11-17T02:00:00.000Z`). Goal: discuss AI assistant integration, recent launches, and spending controls for a potential product partnership.
- Research start/cutoff: `2026-11-16T15:15:32.890Z`. Window starts `2026-10-18T02:00:00.000Z`.
- Actual browser POST returned a live result: 3 findings, 1 question, 10 unique sources, 9 eligible and 1 excluded because its publication date was unavailable. Three pages were extracted.
- Duration: **12,135 ms**. Calls: 3 Search, 1 Extract, 1 model. Gemini reported **9,433 input / 637 output tokens**. Tavily reported **3 credits**.
- Sources cited include [OpenAI's Jill Hazelbaker announcement](https://openai.com/index/jill-hazelbaker-chief-corporate-affairs-officer) (provider date 2026-11-03), [Oracle integration](https://openai.com/index/oracle-apps-in-chatgpt) (2026-10-27), [ServiceNow partnership](https://openai.com/index/openai-servicenow-partnership-expansion) (2026-10-28), and [Nextgov's leadership report](https://www.nextgov.com/people/2026/11/openai-hones-public-sector-focus-new-leadership-hires/417047) (2026-11-04).
- No browser page errors. Actual PDF export contains one A4 page. [Captured output](../submission/BriefSignal-live-company.pdf), [actual UI](images/live-workspace.png), and [research trail](images/live-trail.png) are included.

## Completed person case

- Subject: Sam Altman; domain hint: `openai.com`. Same illustrative meeting time and window start. Goal: prepare questions about recent public AI announcements and responsible product deployment.
- Research start/cutoff: `2026-11-16T15:13:53.900Z`.
- Actual browser POST returned a live result: 3 findings, 2 questions, 15 unique sources. Three obvious entity mismatches were excluded. Three pages were extracted.
- Duration: **9,030 ms**. Calls: 3 Search, 1 Extract, 1 model. Gemini reported **11,457 input / 677 output tokens**. Tavily reported **4 credits**.
- Cited sources: [Ynetnews robotics report](https://www.ynetnews.com/tech-and-digital/article/sjf4g3nngx) (provider date 2026-10-20), [Business Standard's appointment report](https://www.business-standard.com/technology/tech-news/why-openai-has-hired-ex-us-army-secretary-dan-driscoll-for-security-role-126110300383_1.html) (2026-11-03), and [ETDatacenters' chip-partnership report](https://datacenters.economictimes.indiatimes.com/news/ai-compute-infrastructure/openai-seeks-samsung-sk-partnerships-amid-chip-supply-crisis/135460748) (2026-11-02).
- No browser page errors. PDF export contains one A4 page after tightening print spacing; the first print version spilled source references onto a second page.

## Review findings and remaining limits

Returned IDs and quoted excerpts were inspected against retained source text. The main topics were present, but **a matching quote does not establish that every generated clause is entailed**. One earlier person result introduced a program name absent from its cited source excerpt; a stricter synthesis prompt removed it on rerun. Date specificity remains a limitation: a company result treats an announcement's publication date as the appointment date, and groups hires under a month more broadly than the cited sentence warrants. The captured PDF preserves actual output instead of silently editing away this limitation.

These observations demonstrate pipeline operation and inspectable evidence, not fact-checking certainty. Gaps can also overstate an absence: “no agreement announced” does not prove none was finalized. Human review of dates, clauses and source context remains necessary. Further work should add independent entailment review and a labeled evaluation set.

Dates above are provider metadata, not independently established event dates. The official domain is a user hint, not verified ownership. Meeting details are test scenarios, not real appointments. No accuracy or time-saving percentage is claimed. Reported usage is not final account billing reconciliation.

## Failures observed and fixes

- Direct Google connections from this machine timed out. The user's existing local HTTP proxy was discovered and an optional loopback-only Gemini bridge added for development.
- Workerd rejects `redirect: "error"`. The client now uses `manual`; any 3xx response fails closed without forwarding credentials. A regression test covers this.
- A complete company run timed out during synthesis; another returned HTTP 503. These were visible errors, never synthetic success. Model timeout is now 90 seconds, searches/extraction remain 45 seconds, and there are no automatic retries.
- Subsequent company and person runs completed. Earlier successful examples took 14.3 and 15.9 seconds, showing that timing varies.
- Raw provider responses and full retained source text remain in ignored local files and are not republished.
