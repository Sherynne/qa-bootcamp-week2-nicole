
import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productCards = page.locator('[data-test="product-name"]');
    // Match the visible text. Copy the wording exactly as it appears on screen.
    this.noResultsMessage = page.getByText('There are no products found');
  }

  async open() {
    await this.page.goto('/');
    await expect(this.searchInput).toBeVisible();
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async expectNoResultsMessage() {
    await expect(this.noResultsMessage).toBeVisible();
  }

  async expectNoProductsListed() {
    await expect(this.productCards).toHaveCount(0);
  }
}