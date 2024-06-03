import { test as base, chromium, type BrowserContext } from '@playwright/test';
import { resolve } from 'path';


export const test = base.extend<{ context: BrowserContext; extensionId: string }>({
    // eslint-disable-next-line no-empty-pattern
    context: async ({}, use) => {
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
        await use(context);
        await context.close();
    },
    extensionId: async ({ context }, use) => {
        let [background] = context.serviceWorkers();
        if (!background) {
            background = await context.waitForEvent('serviceworker');
        }
        const extensionId = background.url().split('/')[2];
        await use(extensionId);
    },
});

export const expect = test.expect;
