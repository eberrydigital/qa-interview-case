import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('localhost:5173');
  const content = page.getByRole('heading', {
    name: 'Hello Vite + React',
  });
  expect(content).not.toBeNull();
});
