// Records real UI interactions. The overlay is a video caption, not an app feature.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

process.env.PLAYWRIGHT_BROWSERS_PATH ??= path.resolve('work/playwright-browsers');
const { chromium } = await import('@playwright/test');
await fs.mkdir('work/video', { recursive: true });
await fs.mkdir('submission', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 }, timezoneId: 'Asia/Shanghai',
  recordVideo: { dir: 'work/video', size: { width: 1440, height: 1000 } },
});
const page = await context.newPage();
const video = page.video();
const errors = [];
let liveRequests = 0;
page.on('pageerror', e => errors.push(e.message));
await page.route('**/api/brief', route => {
  if (route.request().method() === 'POST') { liveRequests++; return route.abort(); }
  return route.continue();
});
const hold = ms => page.waitForTimeout(ms);
const caption = async (title, detail) => page.evaluate(({ title, detail }) => {
  let bar = document.getElementById('recording-caption');
  if (!bar) {
    bar = document.createElement('div'); bar.id = 'recording-caption';
    bar.setAttribute('popover', 'manual');
    bar.style.cssText = 'position:fixed;inset:auto 0 0 224px;margin:0;border:0;width:auto;z-index:10000;background:#163f32;color:white;padding:20px 40px;box-shadow:0 -5px 30px #163f3220;pointer-events:none;font:18px Arial,sans-serif;';
    document.body.append(bar);
  }
  bar.replaceChildren();
  const heading = document.createElement('div'); heading.textContent = title;
  heading.style.cssText = 'font-size:23px;font-weight:600;margin-bottom:8px;';
  const body = document.createElement('div'); body.textContent = detail; body.style.color = '#dbe9df';
  bar.append(heading, body);
  if (bar.matches(':popover-open')) bar.hidePopover();
  bar.showPopover();
}, { title, detail });
const scrollTo = async selector => {
  await page.locator(selector).first().evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  await hold(1100);
};
const shot = async name => page.screenshot({ path: `work/video/${name}.png` });

try {
  await page.goto('http://127.0.0.1:5173');
  await page.locator('[data-hydrated="true"]').waitFor();
  await page.getByText('Fictional company · fixed dates · no live API calls').waitFor();
  await page.evaluate(() => {
    document.body.style.paddingBottom = '150px';
    const cover = document.createElement('div'); cover.id = 'recording-cover';
    cover.style.cssText = 'position:fixed;inset:0;z-index:20000;background:#f6f8f3;color:#163f32;display:flex;flex-direction:column;justify-content:center;padding:100px;font:20px Arial,sans-serif;';
    cover.innerHTML = '<div style="letter-spacing:4px;font-size:17px">GLOBAL AI HACKATHON · TAVILY RESEARCH AGENT</div><div style="font:100px Georgia,serif;margin:35px 0 8px">BriefSignal.</div><div style="font:48px Georgia,serif">Walk in informed.</div><div style="margin-top:65px;line-height:1.8">Recorded working prototype<br>Fictional demo · No live API calls · English captions</div>';
    document.body.append(cover);
  });
  await hold(3500); await shot('01-title');
  await page.locator('#recording-cover').evaluate(el => el.remove());

  await caption('01 / Start with the meeting', 'Company or person, meeting time, and goal keep the research focused.');
  await hold(5000); await shot('02-context');
  await caption('02 / Read the brief', 'Recent developments, meeting implications, and source-linked questions.');
  await scrollTo('.signal'); await hold(4300);
  await scrollTo('.questions-section'); await hold(4300); await shot('03-questions');

  await page.getByRole('button', { name: 'Inspect source S1', exact: true }).first().click();
  await caption('03 / Inspect the evidence', 'Open a citation to inspect the exact excerpt. This example is a labeled synthetic fixture.');
  await hold(5600); await shot('04-source');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' })); await hold(900);

  await page.getByRole('tab', { name: /Evidence/ }).click();
  await page.getByRole('button', { name: 'Excluded', exact: true }).click();
  await caption('04 / Inspect what was excluded', 'Old, undated, and future sources remain visible, with reasons for exclusion.');
  await scrollTo('.ledger-panel');
  await hold(6000); await shot('05-exclusions');

  await page.getByRole('tab', { name: 'Research trail', exact: true }).click();
  await caption('05 / Keep the run transparent', 'Demo usage is zero. Live mode reports actual calls and provider-reported usage.');
  await hold(5500); await shot('06-trail');

  await page.getByRole('tab', { name: 'The brief', exact: true }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await caption('06 / Keep it for the meeting', 'Save on this device. Export Markdown or JSON, or print a one-page PDF.');
  await hold(2400);
  await scrollTo('.export-bar');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Markdown', exact: true }).click();
  const download = await downloadPromise;
  assert.match(download.suggestedFilename(), /\.md$/);
  await hold(3500); await shot('07-export');

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' })); await hold(900);
  await caption('BriefSignal / Walk in informed.', 'Source code, pitch deck, and setup: github.com/sutinah12-hash/briefsignal-global-ai-hackathon');
  await hold(4000); await shot('08-finish');
  assert.equal(liveRequests, 0, 'The recording must never request live research.');
  assert.deepEqual(errors, [], 'The recording must have no browser page errors.');
  assert.equal(await page.locator('.saved-row').count(), 1);
} finally {
  await context.close();
  try { await video.saveAs('submission/BriefSignal-demo.webm'); }
  finally { await browser.close(); }
}
const stat = await fs.stat('submission/BriefSignal-demo.webm');
console.log(JSON.stringify({ video: 'submission/BriefSignal-demo.webm', bytes: stat.size, liveRequests, browserErrors: errors.length }));
