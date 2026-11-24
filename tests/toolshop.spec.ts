
import { test, expect } from '@playwright/test';

// The with-bugs site uses hash routing, so every route starts with /#/
const BASE_URL = 'https://with-bugs.practicesoftwaretesting.com/#/';

// This site is slow (the title test alone took ~5s, the default limit).
// This only raises how long a retrying expect may keep trying. It is not a
// fixed wait: each check still passes the moment its condition is true.
expect.configure({ timeout: 15_000 });

test.describe('Toolshop UI (with-bugs)', () => {
  test('home page has the expected title', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0 with bugs');
  });

  test('search for "pliers" returns only products with "pliers" in the name', async ({ page }) => {
    await page.goto(BASE_URL);

    // The search input has no label or placeholder, but it is the only
    // textbox on the home page, so its role alone finds it.
    // The submit button reads "Serch" on this site (a planted typo), so the
    // regex accepts both "Serch" and "Search".
    const searchBox = page.getByRole('textbox');
    const searchButton = page.getByRole('button', { name: /^\s*Sea?rch\s*$/i });

    await searchBox.fill('pliers');
    await searchButton.click();

    // Wait until the search has really finished. The caption and the
    // "N products found" text appear immediately (with the OLD results),
    // so wait for the results container the app marks as completed.
    await expect(page.getByRole('heading', { name: /Searched for: pliers/i })).toBeVisible();
    // toBeAttached (not toBeVisible): if the search returns nothing, this
    // container is empty and therefore "hidden", but it is still on the page.
    await expect(page.locator('[data-test="search_completed"]')).toBeAttached();

    // Product names are h5 headings inside the product cards (links).
    const productNames = page.getByRole('link').getByRole('heading', { level: 5 });
    // Retrying check: waits for results to render, and fails with a clear
    // message if the search returns nothing.
    await expect(productNames, 'search for "pliers" should return at least one product').not.toHaveCount(0);

    const count = await productNames.count();
    for (let i = 0; i < count; i++) {
      await expect(productNames.nth(i)).toContainText(/pliers/i);
    }
  });

  test('invalid login is rejected with an error message', async ({ page }) => {
    await page.goto(`${BASE_URL}auth/login`);

    // Both fields use placeholders (no labels). The password input has no
    // "textbox" role, so it is found by placeholder inside its wrapper
    // (the wrapper element carries the same placeholder attribute).
    await page.getByRole('textbox', { name: 'Your E-mail *' }).fill('not.a.user@example.com');
    await page.locator('app-password-input').getByPlaceholder('Your password *').fill('WrongPassword123!');
    await page.getByRole('button', { name: 'Login' }).click();

    // The error box is a plain div (no role="alert"), so match its text.
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });
});
