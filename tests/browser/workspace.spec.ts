import { test, expect } from '@playwright/test';
test.beforeEach(async ({page}) => {
  // Browser regression checks must never consume a developer's configured API quota.
  await page.route('**/api/brief', route => route.request().method() === 'GET'
    ? route.fulfill({ json: { liveReady: false, tavilyConfigured: false, modelConfigured: false, tokenRequired: false } })
    : route.fulfill({ status: 503, json: { error: 'Offline browser test: provider calls disabled.' } }));
  await page.goto('/'); await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
});
test('desktop demo, source inspection, exclusions, export, and saved brief', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await expect(page.getByRole('heading',{name:'Walk in informed.'})).toBeVisible();
  await expect(page.getByText('Fictional company · fixed dates · no live API calls')).toBeVisible();
  await page.screenshot({ path:'docs/images/workspace-desktop.png',fullPage:true });
  await page.getByRole('button',{name:'Inspect source S1',exact:true}).first().click();
  await expect(page.getByRole('dialog')).toContainText('Synthetic demo fixture');
  await expect(page.getByRole('dialog')).toContainText('Northstar Robotics opened the Atlas');
  await page.getByRole('button',{name:'Close dialog'}).click();
  await page.getByRole('tab',{name:/Evidence/}).click();
  await page.getByRole('button',{name:'Excluded',exact:true}).click();
  await expect(page.locator('.source-row')).toHaveCount(3);
  await expect(page.locator('.source-row')).toContainText(['Published before','Publication date unavailable','Published after']);
  await page.screenshot({path:'docs/images/evidence-ledger.png',fullPage:true});
  await page.getByRole('tab',{name:'Research trail'}).click();
  await expect(page.locator('.run-stats')).toContainText('0');
  await page.getByRole('tab',{name:'The brief',exact:true}).click();
  const downloadPromise=page.waitForEvent('download'); await page.getByRole('button',{name:'Markdown',exact:true}).click();
  const download=await downloadPromise; expect(download.suggestedFilename()).toContain('.md');
  await page.getByRole('button',{name:'Save',exact:true}).click(); await page.reload();
  await expect(page.locator('.saved-row')).toHaveCount(1);
  await page.getByRole('button',{name:'Remove saved Northstar Robotics'}).click(); await expect(page.locator('.saved-row')).toHaveCount(0);
  expect(errors).toEqual([]);
});
test('missing live configuration opens honest setup; mobile does not overflow',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Generate briefing',exact:true}).click();
  await expect(page.getByRole('dialog')).toContainText('Not configured');
  await page.getByRole('button',{name:'Close dialog'}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:'docs/images/workspace-mobile.png',fullPage:true});
});
test('live HTTP error is displayed while the previous demo remains labeled',async({page})=>{
  await page.route('**/api/brief',async route=>route.request().method()==='GET'?route.fulfill({json:{liveReady:true,tavilyConfigured:true,modelConfigured:true,tokenRequired:false}}):route.fulfill({status:429,json:{error:'Provider quota exhausted. No paid retry performed.'}}));
  await page.goto('/'); await expect(page.getByRole('button',{name:/Live research ready/})).toBeVisible();
  await page.getByRole('button',{name:'Generate briefing',exact:true}).click();
  await expect(page.getByRole('alert')).toContainText('Provider quota exhausted');
  await expect(page.getByText('Fictional company · fixed dates · no live API calls')).toBeVisible();
});
