# Validation record

Run date: 2026-11-16. Platform: Windows, Node 24.18, Chrome headless.

- `npm test`: 16 passing tests. Controlled HTTP fixtures; no live provider use.
- `npm run typecheck`: passed.
- `npm run build`: passed. The framework reports `/` as statically unclassified; this is not a build failure.
- `npx playwright test`: 3 passing browser scenarios.
- Desktop (1440 px) and mobile (390 px) screenshots inspected.
- `submission/BriefSignal-sample-brief.pdf`: one A4 page, generated from the actual app print stylesheet.
- Pitch deck: 8 slides; package integrity, slide geometry, font policy and re-import checks passed. All slides visually inspected; screenshots embedded, not linked. PDF generated from the inspected slide renders. Native PowerPoint application behavior was not tested.
- Recorded walkthrough: 56.2 seconds, 1440 × 1000, VP9/WebM, English captions, no audio. Real browser interactions completed with zero live research requests and zero browser page errors. Full playback completed in Chrome without media errors; title, source, exclusion, export and decoded video frames were visually inspected. This explicitly labeled fictional demonstration is not a live provider run.

The browser suite verifies source inspection, all three demo exclusion reasons, Markdown download, saving and deleting a local brief, restoration after reload, no horizontal mobile overflow, missing-key guidance, and visible provider errors. Initial hydration is now explicitly marked; controls remain inert until React is ready.

## Not yet validated

- Real Tavily credentials, extraction availability, rate limits, and billed usage.
- Real model schema behavior and semantic grounding quality.
- Real companies/persons with namesakes, ambiguous publication dates, and contradictory reports.
- Multi-user hosted operation and distributed quotas.
- Competition submission receipt.

No accuracy, time-saving, adoption, or cost-saving percentages are claimed from these tests.
