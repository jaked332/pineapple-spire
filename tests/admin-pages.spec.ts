import { test, expect } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json',
});

test('Home Page Loading', async ({ page }) => {
  const response = await page.goto('http://localhost:3000/');
  expect(response?.status()).toBe(200);
});

test('About Page Loading', async ({ page }) => {
  const response = await page.goto('http://localhost:3000/about');
  expect(response?.status()).toBe(200);
});

test('Stress Test Tool Page Loading', async ({ page }) => {
  const response = await page.goto('http://localhost:3000/stress-test-tool');
  expect(response?.status()).toBe(200);
});

test('Financial Compilation Page Loading', async ({ page }) => {
  const response = await page.goto('http://localhost:3000/financial-compilation');
  expect(response?.status()).toBe(200);
});
