import { chromium, test as setup } from '@playwright/test';
import { resolve } from 'path';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async () => {
    const pathToExtension = resolve(process.cwd(), './build/chrome-mv3-prod');
    const context = await chromium.launchPersistentContext('', {
        headless: false,
        args: [
            // `--headless=new`,
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
            `--disable-blink-features=AutomationControlled`,
            `--disable-dev-shm-usage`,
        ],
        ignoreDefaultArgs: ['--disable-component-extensions-with-background-pages'],
    });

    const page = await context.newPage();
    await page.goto('https://mail.google.com');
    await page.waitForSelector('#identifierId', { state: 'visible' });
    await page.fill('#identifierId', process.env.MAIL);
    await page.waitForSelector('#identifierNext', { state: 'visible' });
    await page.click('#identifierNext');
    await page.waitForSelector('[name=Passwd]', { state: 'visible' });
    await page.fill('[name=Passwd]', process.env.PASSWORD);
    await page.waitForSelector('#passwordNext');
    await page.click('#passwordNext');
    await page.waitForTimeout(5000); // Wait for 5 seconds instead of waitForNavigation
    await page.screenshot({ path: 'auth_screenshot.png' });

    // End of authentication steps.
    await context.storageState({ path: authFile });
    await context.close();
});
