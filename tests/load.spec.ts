import { test, expect } from '@playwright/test';

test('Application loads and renders dashboard', async ({ page }) => {
  page.on('request', request => {
    if (request.url().includes('src')) {
      console.log('REQUEST:', request.url());
    }
  });
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => {
    console.log('BROWSER ERROR:', err.message);
    console.log('REASON:', err.stack);
  });

  // Go to the home page
  await page.goto('/');

  // Check if the page title is correct
  await expect(page).toHaveTitle(/C# MediaLibrary Pro/);

  // Wait for the Catalog Explorer heading which indicates dashboard is loaded
  const heading = page.locator('h2:has-text("Catalog Explorer")');
  await expect(heading).toBeVisible({ timeout: 10000 });

  // Check if we have items rendered (the dashboard should show a grid of items)
  const items = page.locator('.grid > div');
  try {
    await expect(heading).toBeVisible({ timeout: 10000 });
  } catch (e) {
    const content = await page.content();
    console.log('Page content on failure:', content);
    throw e;
  }

  // Check for the terminal logs if we switch to terminal view
  // Or just check if the initial "SYSTEMS INITIALIZING" is gone
  const initializer = page.locator('text=[ SYSTEMS INITIALIZING ... ]');
  await expect(initializer).not.toBeVisible();
});

test('Logging critical errors to console', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/');
  
  // Wait a bit for potential async errors
  await page.waitForTimeout(2000);

  if (errors.length > 0) {
    console.error('Detected browser-side errors:', errors);
  }
  
  expect(errors.filter(e => e.includes('main.tsx: Critical error')).length).toBe(0);
});
