import { test, expect, type Page, chromium } from '@playwright/test';
import { Server } from './common';

test.describe.configure({ mode: 'serial' });

test('runs last', async () => {
  const port = 8001;
  const server = new Server(port);
  await server.beforeAll();
  
  const res = await server.connection.query(`SELECT 
    balance, 
    user_id
  FROM 
    wallets`);

  const sortedRes = res[0].toSorted((a, b) => a.user_id - b.user_id);
  expect(sortedRes).toEqual([
    { balance: '535.50', user_id: 2 },
    { balance: '495.00', user_id: 3 },
    { balance: '490.00', user_id: 4 },
    { balance: '480.00', user_id: 5 },
    { balance: '495.00', user_id: 6 },
  ]);

  await server.afterAll();
});