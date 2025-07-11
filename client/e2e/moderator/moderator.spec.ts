import { test, expect, type Page, chromium } from '@playwright/test';
import { MODERATOR_MOBILE } from '../../../common/gameutils';

const HOMEPAGE = 'http://localhost:3001';
const SERVER_URL = 'http://localhost:8002';
const width = 500;
const height = 850;

test.describe.configure({ mode: 'parallel' });
test.describe('ModeratorTests', () => {
  test("Basic Cycle", async ({request}) => {
    const res = await request.get(`${SERVER_URL}/restart`);
    let text = await res.text();
    expect(text).toEqual("Restart Game Successful");

    const page = await spawnModerator(0, 0, width, height, HOMEPAGE);

    await page.getByTestId('gameStates').click();
    await page.getByTestId('open').click();
    await page.getByTestId('lastCall').click();
    await page.getByTestId('closed').click();
    await page.getByTestId('fold').click();
    await page.getByTestId('winnerSelection').click();

    await page.getByTestId('aries').click();
    await page.getByTestId('taurus').click();
    await page.getByTestId('gemini').click();
    await page.getByTestId('cancer').click();
    await page.getByTestId('confirm').click();

    await page.getByTestId('foldWinnerSelection').click();
    await page.getByTestId('gameStates').click();
    await page.getByTestId('newGame').click();

    await expect(page.getByTestId('open')).toHaveCSS("background", "rgb(0, 128, 0)");
  });

});



async function spawnModerator(x, y, width, height, homepage) {
  const browser = await chromium.launch({
    args: [`--window-position=${x},${y}`]
  });

  const p = await browser.newPage();
  await p.setViewportSize({ width: width, height: height })
  await spawnUser(p, MODERATOR_MOBILE, 'moderator', homepage);
  return p
}


async function spawnUser(page, mobileNum, userType, homepage) {
  await page.goto(`${homepage}/login`);
  await page.waitForURL(`${homepage}/login`);

  const mobile  = await page.waitForSelector(`#mobile`);
  await mobile.fill(mobileNum);

  const check = await page.waitForSelector('.PrivateSwitchBase-input');
  await check.click();

  const signIn  = await page.getByText(`Sign in`);
  await signIn.click();
  await page.waitForLoadState();

  await page.waitForTimeout(50);
  await page.keyboard.type('111111', {delay: 10});

  const verify  = await page.getByText(`Verify`);
  await verify.click();

  const letsGo = await page.getByText(`Lets Go!`);
  await letsGo.click();

  const goto = await page.goto(`${homepage}/game/${userType}`);
  await page.waitForURL(`${homepage}/game/${userType}`);
  // await page.waitForLoadState();
}


