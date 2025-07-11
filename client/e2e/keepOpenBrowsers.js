const { chromium } = require('playwright');

async function launchBrowsers(numBrowsers) {
  const browserInstances = [];

  // Launch multiple browser instances
  for (let i = 0; i < numBrowsers; i++) {
    // const wsEndpoint = `ws://localhost:690${i}`;
    // const browser = await chromium.launch({ wsEndpoint, headless: false }); // Connect to the browser using WebSocket endpoint and make it headed
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    browserInstances.push(browser);
  }

  console.log(`Total ${numBrowsers} browsers are running. Press Ctrl+C to exit.`);

  // Keep the script running indefinitely until manually terminated
  await new Promise(() => {});
}

const numBrowsers = 5; // Specify the number of browsers you want to open
launchBrowsers(numBrowsers).catch(console.error);
