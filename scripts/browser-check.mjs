import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

// Own the preview process so failures cannot leave a test server behind.
const externalUrl = process.env.TEST_BASE_URL;
const baseUrl = externalUrl ?? 'http://127.0.0.1:4176';
const server = externalUrl
  ? null
  : spawn(
      process.execPath,
      ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '4176', '--strictPort'],
      { stdio: 'pipe' },
    );
let browser;
let serverError = '';
server?.stderr.on('data', (chunk) => {
  serverError += String(chunk);
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      if ((await fetch(baseUrl)).ok) {
        ready = true;
        break;
      }
    } catch {
      /* The local server may still be starting. */
    }
    if (server?.exitCode !== null && server)
      throw new Error(`Preview server exited: ${serverError}`);
    await delay(100);
  }
  assert.ok(ready, `Preview server unavailable: ${serverError}`);
  browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || undefined,
    headless: true,
    args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  const graphicsErrors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') graphicsErrors.push(message.text());
  });
  await page.goto(baseUrl);
  await page.locator('.world-ready').waitFor();
  assert.equal(await page.locator('.project-card').count(), 4);
  await page.locator('.label-systems').click();
  await page.waitForFunction(() => location.hash.includes('island=systems'));
  assert.equal(await page.locator('.project-card').count(), 1);
  assert.match(await page.locator('#collection-title').innerText(), /Systems/);
  await page.locator('[data-overview]').click();
  await page.locator('.view-switch [data-view="quick"]').click();
  assert.equal(await page.locator('.explore-hero').isVisible(), false);
  assert.equal(await page.locator('.project-card').count(), 4);
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'collection');
  assert.equal(await page.locator('.explore-hero').isVisible(), false);
  await page.goBack();
  await page.locator('.explore-hero').waitFor();
  console.log('PASS: WebGL atlas, island filters, Quick View, browser history');

  const openProject = async (id) => {
    await page.locator(`[data-project="${id}"]`).click();
    await page.locator('#project-dialog').waitFor();
  };
  await openProject('beyond-the-frame');
  await page.locator('[data-unfold]').waitFor();
  await page.locator('[data-unfold]').click();
  assert.equal(await page.locator('[data-unfold]').getAttribute('aria-pressed'), 'true');
  await page.keyboard.press('Escape');
  await page.locator('#project-dialog').waitFor({ state: 'hidden' });
  assert.equal(
    await page.evaluate(() => document.activeElement?.getAttribute('data-project')),
    'beyond-the-frame',
  );
  console.log('PASS: layered depth, explicit touch/keyboard toggle, Escape, focus restoration');

  await openProject('signal-garden');
  await page.locator('.game-canvas').waitFor();
  await page.locator('#demo-container').focus();
  for (const [key, count] of [
    ['ArrowRight', 4],
    ['ArrowDown', 4],
    ['ArrowLeft', 5],
    ['ArrowUp', 5],
    ['ArrowRight', 3],
  ]) {
    for (let index = 0; index < count; index++) await page.keyboard.press(key);
  }
  assert.match(await page.locator('.game-status').innerText(), /Welcome home/);
  await page.locator('[data-restart]').click();
  assert.match(await page.locator('.game-status').innerText(), /0 \/ 3/);
  await page.keyboard.press('Escape');
  console.log('PASS: game movement, all collectibles, win, restart');

  await openProject('fluid-lens');
  await page.locator('#refraction').waitFor();
  await page.waitForFunction(() => document.querySelector('.fluid-viewport canvas')?.width > 300);
  assert.equal(await page.locator('#refraction').isEnabled(), true);
  await page.locator('#refraction').fill('2');
  assert.equal(await page.locator('#refraction-value').innerText(), '2.00');
  await page.locator('.fluid-viewport').hover({ position: { x: 150, y: 100 } });
  await page.locator('[data-reset]').click();
  assert.equal(await page.locator('#refraction-value').innerText(), '1.50');
  assert.deepEqual(graphicsErrors, []);
  await page
    .locator('.fluid-viewport canvas')
    .evaluate((canvas) =>
      canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true })),
    );
  assert.equal(await page.locator('#refraction').isEnabled(), false);
  assert.match(await page.locator('[data-fluid-status]').innerText(), /context was lost/);
  await page.keyboard.press('Escape');
  console.log(
    'PASS: shader compilation, lens input, material controls, reset, context-loss fallback',
  );

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.documentElement.classList.contains('motion-off'));
  assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'), 'false');
  await page.goto(`${baseUrl}/#view=quick&island=memory&project=beyond-the-frame`);
  await page.locator('.depth-frame').waitFor();
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.querySelector('.depth-frame')).transform),
    'none',
  );
  await page.keyboard.press('Escape');
  await page.goto(`${baseUrl}/#view=quick&project=missing-project`);
  assert.equal(await page.locator('#project-dialog').isVisible(), false);
  assert.ok(!(await page.evaluate(() => location.hash)).includes('missing-project'));
  console.log('PASS: live reduced-motion preference, deep link, invalid project fallback');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl);
  assert.equal(await page.locator('#world-canvas').isVisible(), false);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.locator('.label-experiment').click();
  await openProject('fluid-lens');
  await page.locator('#refraction').waitFor();
  assert.equal(
    await page.evaluate(() => document.querySelector('#project-dialog').scrollWidth > innerWidth),
    false,
  );
  await page.keyboard.press('Escape');
  console.log('PASS: mobile illustrated map, navigation, shader dialog bounds');

  const fallback = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  fallback.on('pageerror', (error) => errors.push(error.message));
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === 'webgl' || type === 'webgl2') return null;
      return original.call(this, type, ...args);
    };
  });
  await fallback.goto(baseUrl);
  await fallback.waitForFunction(() =>
    document.querySelector('#map-note')?.textContent.includes('ILLUSTRATED MAP'),
  );
  await fallback.locator('.view-switch [data-view="quick"]').click();
  await fallback.locator('[data-project="fluid-lens"]').click();
  await fallback.locator('[data-fluid-status]').waitFor();
  await fallback.waitForFunction(() =>
    document.querySelector('[data-fluid-status]')?.textContent.includes('unavailable'),
  );
  assert.equal(await fallback.locator('.fluid-viewport img').isVisible(), true);
  assert.equal(await fallback.locator('#refraction').isEnabled(), false);
  await fallback.keyboard.press('Escape');
  console.log('PASS: disabled WebGL keeps atlas, content, and static shader fallback usable');
  assert.deepEqual(errors, []);
  console.log('PASS: no uncaught browser errors');
} finally {
  await browser?.close();
  server?.kill('SIGTERM');
}
