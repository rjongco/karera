import { setup, teardown } from 'jest-dev-server';
import * as mysql from 'mysql2/promise';
import { chromium } from 'playwright/test';
import { MODERATOR_MOBILE } from '../../common/gameutils';

export const homepage = 'http://localhost:3001';
export const WIDTH = 500;
export const HEIGHT = 500;

export class Server {
  server;
  port;
  connection;

  constructor(port = 8001) {
    this.port = port;
  }

  async beforeAll() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'testing',
      database: `zodiac${this.port}`,
    });

    // this.server = await setup({
    //   command: `
    //   lsof -i :${this.port}
    //   kill $(lsof -t -i:${this.port}) 
    //   PORT=${this.port} DB_NAME=zodiac${this.port} npm run dev
    //   `,
    //   debug: true,
    //   // launchTimeout: 30000,
    // });
  }
  async afterAll() {
    await this.connection.end();
    // await teardown(this.server);
  }

  async beforeEach() {
    // await initDatabase(this.connection);
    // await clearTables(this.connection);
  }

  async afterEach() {
    
  }

  async query(query) {
    if (this.connection !== null) {
      await this.connection.query(query);
    }
  }
}

export async function spawnModerator() {
  const browser = await chromium.launch({
    args: ['--window-position=0,0']
  });

  const p = await browser.newPage();
  await p.setViewportSize({ width: WIDTH, height: HEIGHT })
  await spawnUser(p, MODERATOR_MOBILE, 'moderator');
  return p
}

export async function spawnUser(page, mobileNum, userType) {
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


