# Live validation

Status: **Partial live validation.** Tavily Search and Extract have passed real API probes. Model generation and the complete browser-to-brief pipeline are still pending a usable model credential.

Before a complete pipeline run, confirm that Tavily pay-as-you-go and auto-upgrade are off and the model account has a verified free tier or an active promotional grant, with no paid fallback or automatic recharge authorized for this task. Keep keys in the ignored `.dev.vars` file.

Account setup check on 2026-11-16: the authenticated OpenAI account did not expose an API-credit activation option in either ChatGPT billing or API Platform billing, and no active API grant was observed. No credits were purchased and no model calls were made. The existence of an eligible subscription plan or an official benefit guide is not evidence that this account received a grant.

Tavily's Researcher free plan showed 1,000 credits remaining before testing. Auto-upgrade was disabled; both auto-upgrade and pay-as-you-go were checked again after reloading and were off. A dedicated project key was configured in the ignored local file.

A free Google AI Studio project was created without paid billing. Automated API-key creation was blocked with "The request is suspicious". Manual key creation and actual model quota verification remain pending. No Google model calls were made.

## Observed provider probes — 2026-11-16

- Search: HTTP 200, basic news search for recent OpenAI announcements, date filter 2026-10-18 through 2026-11-16, three returned dated sources. The response reported **1 credit**.
- Returned sources included [OpenAI's ChatGPT Wallet announcement](https://openai.com/index/introducing-chatgpt-wallet), published 2026-11-13; [PPC Land coverage](https://ppc.land/openai-hands-its-ai-agents-a-wallet-without-the-real-card-number-in-it), published 2026-11-14; and [TechCrunch coverage](https://techcrunch.com/2026/11/10/openai-rolls-out-new-business-profiles-making-chatgpt-just-a-little-bit-more-like-google), published 2026-11-10. Dates here are provider-returned publication metadata, not independently verified event dates.
- Extract: HTTP 200 for the OpenAI announcement above; one successful result, zero failed results, 13,875 returned characters. The response reported **0 credits**; this is a provider report, not a promise about extraction pricing.
- These probes establish credential acceptance and functioning search/extraction endpoints. They do not establish model synthesis, semantic accuracy, or full pipeline operation. Raw provider responses are retained only in ignored local working files, not republished in the repository.

For each real run, record: entity, official domain, meeting timestamp with timezone, research timestamp, returned source URLs/publication dates, accepted and excluded findings, manually checked support, errors, wall time, and provider-reported usage. Do not commit private meeting context or credentials.

Recommended cases: a company with recent launches; a person with an unambiguous public affiliation; a namesake entity; a quiet company with no recent evidence; a past meeting. Inspect each citation and test whether the quoted passage actually supports the full factual statement.

Only update this file with observed results. Offline fixtures must not be reported as live integration evidence.
