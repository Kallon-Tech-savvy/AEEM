const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    console.log('Page loaded');

    // Wait for 3D content to potentially render
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'hero_redesign.png' });
    console.log('Hero screenshot taken');

    // Scroll to impact
    await page.evaluate(() => document.getElementById('impact').scrollIntoView());
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'impact_redesign.png' });

    // Scroll to pillars
    await page.evaluate(() => document.getElementById('initiatives').scrollIntoView());
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'pillars_redesign.png' });

    // Scroll to gallery
    await page.evaluate(() => document.getElementById('gallery').scrollIntoView());
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'gallery_redesign.png' });

  } catch (e) {
    console.error('Error during verification:', e);
  } finally {
    await browser.close();
  }
})();
