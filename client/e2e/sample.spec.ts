import { BrowserContext, chromium, test } from '@playwright/test';
import { homepage } from './common';


const browserEndpoints = [
  'ws://localhost:6900',
  'ws://localhost:6901',
  'ws://localhost:6902'
];

test.describe('Betting', () => {
  let browserInstances;

  test.beforeAll(async () => {
    // Connect to the browsers before running any tests
    browserInstances = await Promise.all(browserEndpoints.map(endpoint => chromium.connect({ wsEndpoint: endpoint })));
  });

  test('test1', async ({request}) => {
    const browserInstance = browserInstances[0];
    const context = await browserInstance.newContext();
    const page = await context.newPage();

    await page.goto(`${homepage}/login`);
    await page.waitForURL(`${homepage}/login`);
  });

});