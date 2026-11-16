# Validation record

Run date: 2026-11-16. Platform: Windows, Node 24.18, Chrome headless.

- `npm test`: 17 passing tests, including credential-safe redirect rejection. Controlled HTTP fixtures; no live provider use.
- `npm run typecheck`: passed.
- `npm run build`: passed. The framework reports `/` as statically unclassified; this is not a build failure.
- `npx playwright test`: 3 passing browser scenarios.
- Desktop (1440 px) and mobile (390 px) screenshots inspected.
- `submission/BriefSignal-sample-brief.pdf`: one A4 page, generated from the actual app print stylesheet.
- Both completed real-case PDFs: one A4 page after tightening print spacing. Full source references remain present.
- Pitch deck: 8 slides; package integrity, slide geometry, font policy and re-import checks passed. All slides visually inspected; screenshots embedded, not linked. PDF generated from the inspected slide renders. Native PowerPoint application behavior was not tested.
- Final deck revision uses licensed workplace photographs and actual live product captures. All eight revised slides were inspected; the final source-dialog change was also checked in the rendered PDF. Credits are in slide notes and `IMAGE-CREDITS.md`.
- Recorded walkthrough: 56.2 seconds, 1440 × 1000, VP9/WebM, English captions, no audio. Real browser interactions completed with zero live research requests and zero browser page errors. Full playback completed in Chrome without media errors; title, source, exclusion, export and decoded video frames were visually inspected. This explicitly labeled fictional demonstration is not a live provider run.
- Windows artifact write regression: generated `submission/` and `work/` files are excluded from development source watching. The development API returned HTTP 200 while a newly created video-path probe was held with an exclusive Windows file lock, and again after release. TypeScript checks passed after the watcher configuration change.

The browser suite verifies source inspection, all three demo exclusion reasons, Markdown download, saving and deleting a local brief, restoration after reload, no horizontal mobile overflow, missing-key guidance, and visible provider errors. Initial hydration is now explicitly marked; controls remain inert until React is ready.

## Live provider checks

- Real browser company and person runs completed through Tavily Search/Extract and Gemini synthesis, with no browser page errors. Latest durations: 12.1 and 9.0 seconds; provider-reported Tavily credits: 3 and 4. Earlier provider timeouts and HTTP 503 occurred. See [the live record](LIVE-VALIDATION.md) for timestamps, usage, sources and limitations.

## Not yet validated

- Independent semantic grounding quality. Spot checks found over-inference risks despite valid quotations.
- Broad cases with namesakes, ambiguous publication dates, and contradictory reports.
- Provider rate-limit behavior and final billing reconciliation.
- Multi-user hosted operation and distributed quotas.
- Competition submission receipt.

No accuracy, time-saving, adoption, or cost-saving percentages are claimed from these tests.
