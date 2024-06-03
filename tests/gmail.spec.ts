import { test } from '@playwright/test';
import { test as ptest } from "~playwright/fixtures";


ptest('extension load test', async ({ page, extensionId }) => {
    await page.goto('chrome://extensions/');
    await page.waitForTimeout(1000); // Wait to ensure all extensions are loaded
    const isExtensionLoaded = await page.evaluate((extensionId) => {
        return chrome.management
            .getAll()
            .then((extensions) => extensions.some((ext) => ext.id === extensionId && ext.enabled));
    }, extensionId);

    if (!isExtensionLoaded) {
        throw new Error('Extension not loaded');
    }
    await page.goto("https://mail.google.com/mail/u/0/#inbox?compose=new");
    await page.waitForTimeout(5000);
    console.log('Extension is loaded and enabled.');
});

test('gmail test', async ({ page }) => {
  await page.goto('https://mail.google.com/mail/u/0/#inbox?compose=new');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'gmail_screenshot.png' });
  // await page.waitForSelector(`div.ai_button_container`);
  // const aiButtonVisibility = await page.locator(`div.ai_button_container`).isVisible();
  // expect(aiButtonVisibility).toBe(true);

  // Uncomment the below code when you want playwright to click the extension icon from the DOM
  // clickExtensionIcon(page)
});