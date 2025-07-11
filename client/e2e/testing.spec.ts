import { test, expect, type Page, chromium } from '@playwright/test';
import { homepage, spawnModerator, spawnUser } from './common';
import { MOBILE_NUMBERS } from '../../common/gameutils';

const WIDTH = 500;
const HEIGHT = 500;
const OFFSET_X = 50;
const pauseEverythingInTheEnd = true;

test.setTimeout(99999999);
test.describe.configure({ mode: 'parallel' });

test.describe('Betting', () => {
  test('Moderator', async ({request}) => {
    const p = await spawnModerator();
    const res = await request.get(`${homepage}/restart`);
    expect(res.ok()).toBeTruthy();
    console.log(res.body());

    await p.pause();

    const standby = await p.locator('#gotoStandby');
    await standby.click();
    
    await p.waitForLoadState();
    const openBetting = await p.getByRole('button', { name: 'Host Game' });
    await openBetting.click();

    // const odds = [9, 9, 4.5, 2.25, 9, 9];
    // for (let idx = 0; idx < odds.length; idx++) {
    //   const odd = await p.locator(".odds").nth(idx);
    //   await expect(odd).toHaveText(`${odds[idx]}`, {timeout: 20000})
    // }
    // await p.pause();

    await p.waitForTimeout(3000);
    const randOrders = getRandomNonRepeatingNumbers(3);
    for (let idx = 0; idx < randOrders.length; idx++) {
      const b = await p.locator(".zodiac-button").nth(randOrders[idx]);
      await b.click();
    }

    // const b1 = await p.locator(".zodiac-button").nth(0);
    // await b1.click();

    // const b2 = await p.locator(".zodiac-button").nth(1);
    // await b2.click();

    // const b3 = await p.locator(".zodiac-button").nth(2);
    // await b3.click();

    // const b4 = await p.locator(".zodiac-button").nth(3);
    // await b4.click();

    const finalize = await p.locator("#finalize");
    await finalize.click();

    // const notOnSchedule = await p.locator("#notOnSchedule");
    // await notOnSchedule.click();
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

/*   test('Player1', async () => {
    const p = await spawnPlayer(MOBILE_NUMBERS[0], OFFSET_X + (WIDTH), 0, WIDTH, HEIGHT);
    const randOrders = getRandomNonRepeatingNumbers(2);
    await bet(p, 0, randOrders[0]);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player2', async () => {
    const p = await spawnPlayer(MOBILE_NUMBERS[1], OFFSET_X + (WIDTH * 2), 0, WIDTH, HEIGHT);
    const randOrders = getRandomNonRepeatingNumbers(2);
    await bet(p, 1, randOrders[1]);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player3', async () => {
    const p = await spawnPlayer(MOBILE_NUMBERS[2], OFFSET_X + (WIDTH * 3), 0, WIDTH, HEIGHT);
    const randOrders = getRandomNonRepeatingNumbers(2);
    await bet(p, 2, randOrders[2]);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player4', async () => {
    const p = await spawnPlayer(MOBILE_NUMBERS[3], OFFSET_X + (WIDTH * 4), 0, WIDTH, HEIGHT);
    const randOrders = getRandomNonRepeatingNumbers(2);
    await bet(p, 3, randOrders[2]);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  }); */
/* 
  test('Player5', async () => {
    const p = await spawnPlayer('+639954401835', OFFSET_X + (WIDTH * 5), 0, WIDTH, HEIGHT);
    await bet(p, 4, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player6', async () => {
    const p = await spawnPlayer('+639981334205', OFFSET_X + (WIDTH * 6), 0, WIDTH, HEIGHT);
    await bet(p, 5, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

 */

/* 
  test('Player7', async () => {
    const p = await spawnPlayer('+639630388163', OFFSET_X + (WIDTH * 0), HEIGHT * 2, WIDTH, HEIGHT);
    await bet(p, 6, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player8', async () => {
    const p = await spawnPlayer('+639208359082', OFFSET_X + (WIDTH * 1), HEIGHT * 2, WIDTH, HEIGHT);
    await bet(p, 7, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player9', async () => {
    const p = await spawnPlayer('+639616543333', OFFSET_X + (WIDTH * 2), HEIGHT * 2, WIDTH, HEIGHT);
    await bet(p, 8, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player10', async () => {
    const p = await spawnPlayer('+639266167459', OFFSET_X + (WIDTH * 3), HEIGHT * 2, WIDTH, HEIGHT);
    await bet(p, 9, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player11', async () => {
    const p = await spawnPlayer('+639352143715', OFFSET_X + (WIDTH * 4), HEIGHT * 2, WIDTH, HEIGHT);
    await bet(p, 10, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player12', async () => {
    const p = await spawnPlayer('+639615723457', OFFSET_X + (WIDTH * 5), HEIGHT * 2, WIDTH, HEIGHT);
    await bet(p, 11, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });

  test('Player13', async () => {
    const p = await spawnPlayer('+639988380772', OFFSET_X + (WIDTH * 6), HEIGHT * 2, WIDTH, HEIGHT);
    await bet(p, 12, 0);
    if (pauseEverythingInTheEnd) {
      await p.waitForTimeout(99999999);
    }
  });
 */
});


async function bet(p, betIndex, amountIndex) {
  const button = await p.locator('.zodiac-button').nth(betIndex);

  // await p.pause();
  await expect(button).toBeEnabled();
  await button.click();

  const bet = await p.locator('.bet-amount').nth(amountIndex);
  await expect(bet).toBeEnabled();
  await bet.click();
}

async function spawnPlayer(mobileNum, x, y, w, h) {
  const browser = await chromium.launch({
    args: [
      `--window-size=${w},${h}`,
      `--window-position=${x},${y}`
    ]
  });
  const p = await browser.newPage();
  await p.setViewportSize({ width: w, height: h })
  await spawnUser(p, mobileNum, 'player');
  const video = await p.locator('.iframe-container').evaluate(element => element.style.display = 'none');
  return p;
}

function getRandomNonRepeatingNumbers(max): number[] {
  const numbers: number[] = [];
  for (let i = 0; i <= max; i++) {
    numbers.push(i);
  }
  
  // Shuffle the array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Return the first four elements
  return numbers.slice(0, 4);
}