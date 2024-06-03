import { test } from '@playwright/test';

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