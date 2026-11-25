
import { test } from '@playwright/test';
import { SearchPage } from '../pages/search-page';

test('TC-01-03: search for an unavailable product name', async ({ page }) => {
  const search = new SearchPage(page);

  await search.open();
  await search.searchFor('fork jembe');

  await search.expectNoResultsMessage();
  await search.expectNoProductsListed();
});