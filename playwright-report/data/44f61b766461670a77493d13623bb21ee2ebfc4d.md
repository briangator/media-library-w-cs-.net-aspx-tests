# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: load.spec.ts >> Application loads and renders dashboard
- Location: tests/load.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h2:has-text("Catalog Explorer")')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('h2:has-text("Catalog Explorer")')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Application loads and renders dashboard', async ({ page }) => {
  4  |   page.on('request', request => {
  5  |     if (request.url().includes('src')) {
  6  |       console.log('REQUEST:', request.url());
  7  |     }
  8  |   });
  9  |   page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  10 |   page.on('pageerror', err => {
  11 |     console.log('BROWSER ERROR:', err.message);
  12 |     console.log('REASON:', err.stack);
  13 |   });
  14 | 
  15 |   // Go to the home page
  16 |   await page.goto('/');
  17 | 
  18 |   // Check if the page title is correct
  19 |   await expect(page).toHaveTitle(/C# MediaLibrary Pro/);
  20 | 
  21 |   // Wait for the Catalog Explorer heading which indicates dashboard is loaded
  22 |   const heading = page.locator('h2:has-text("Catalog Explorer")');
> 23 |   await expect(heading).toBeVisible({ timeout: 10000 });
     |                         ^ Error: expect(locator).toBeVisible() failed
  24 | 
  25 |   // Check if we have items rendered (the dashboard should show a grid of items)
  26 |   const items = page.locator('.grid > div');
  27 |   try {
  28 |     await expect(heading).toBeVisible({ timeout: 10000 });
  29 |   } catch (e) {
  30 |     const content = await page.content();
  31 |     console.log('Page content on failure:', content);
  32 |     throw e;
  33 |   }
  34 | 
  35 |   // Check for the terminal logs if we switch to terminal view
  36 |   // Or just check if the initial "SYSTEMS INITIALIZING" is gone
  37 |   const initializer = page.locator('text=[ SYSTEMS INITIALIZING ... ]');
  38 |   await expect(initializer).not.toBeVisible();
  39 | });
  40 | 
  41 | test('Logging critical errors to console', async ({ page }) => {
  42 |   const errors: string[] = [];
  43 |   page.on('console', msg => {
  44 |     if (msg.type() === 'error') {
  45 |       errors.push(msg.text());
  46 |     }
  47 |   });
  48 | 
  49 |   await page.goto('/');
  50 |   
  51 |   // Wait a bit for potential async errors
  52 |   await page.waitForTimeout(2000);
  53 | 
  54 |   if (errors.length > 0) {
  55 |     console.error('Detected browser-side errors:', errors);
  56 |   }
  57 |   
  58 |   expect(errors.filter(e => e.includes('main.tsx: Critical error')).length).toBe(0);
  59 | });
  60 | 
```