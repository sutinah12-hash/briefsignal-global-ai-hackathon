# HackCulture submission status

**Final submission received; status: Under Review.** Verified after reloading the signed-in form on 2026-11-17 (Asia/Shanghai).

Target: https://hackculture.io/my-events/manage/6af82a03a04278f9e9e6dea2?tab=submissions

Submission ID: `6afb9362aee0b1d442344fb3`.

Final-submit server timestamp: `2026-11-16T23:38:37.792000Z` (2026-11-17 07:38:37 Asia/Shanghai).

Platform confirmation: "Under Review: Your final submission has been received and is under review."

The saved details were verified after reload:

- Theme: `AI Agents & Intelligent Systems` (the only category).
- Problem Statement: `Tavily Research Agent` (one of six options; appears after choosing the category).
- Project Title: `BriefSignal`.
- Github link: `https://github.com/sutinah12-hash/briefsignal-global-ai-hackathon`.
- Additional Tavily integration: empty. The supplied event instructions reserve this optional field for a combined project whose primary problem statement is Bifrost; this project already selects Tavily as its primary problem.
- Second project: `NA (not applied)`; second-project materials empty.
- Pitch: `BriefSignal-pitch.pptx`, uploaded as an actual file, 1,134,787 bytes.
- Demo Video Link: `https://github.com/sutinah12-hash/briefsignal-global-ai-hackathon/blob/main/submission/BriefSignal-demo.webm`. This is a 56-second recorded UI walkthrough using the labeled fictional demo, not a live API run.

## Verified completion

1. File upload returned HTTP 200 and displayed "File uploaded successfully".
2. Save returned HTTP 200 and created a Pending record. Saving alone does not enter the project into evaluation.
3. After reload, View More showed the correct theme, problem statement, repository, video, uploaded pitch and second-project selection.
4. The uploaded pitch was downloaded from HackCulture's storage and matched the final local deck byte-for-byte: SHA256 `146ee9264f2dec0352fdfce0286fad0a033e2475e7189a9aa4a10b97cf7e8211`.
5. Submit for Evaluation was confirmed. The final-submit endpoint returned HTTP 200 with status `under_review`.
6. After another reload, the page displayed Under Review and Submitted. The Edit and Submit for Evaluation buttons were absent; the details confirmed receipt of the final submission.

See [SUBMISSION-RECEIPT.json](SUBMISSION-RECEIPT.json) for the structured receipt. It contains no account credentials or login data.

The submitted source was public at commit `a5e03910547321ec9fbe775e923e1f915050728d`, with passing GitHub CI. The final visual deck was published in commit `5eb1aa858979a7b260bd0781c16ffd98b701ea3b`.

The final confirmation states that submissions cannot be edited after this step. The project is awaiting organizer evaluation; no acceptance, shortlist or award is claimed.

## Event timing and materials

Confirmed deadline in the signed-in form: 21 November 2026, 11:59 PM (event timezone IST; 22 November 2026, 02:29 Asia/Shanghai).

The file input accepts PDF, PPT, PPTX, PNG and JPEG. The final eight-slide PPTX uses licensed workplace photographs and actual live product captures. Its matching PDF is also available in the repository. Real company and person pipeline runs completed using Tavily and a verified free-tier Gemini project. No OpenAI promotional grant or paid purchase is claimed.
