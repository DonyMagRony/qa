import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchSubmit: Locator;
  /** Product cards only (<a data-test="product-<id>">), not name/price spans. */
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByTestId('search-query');
    this.searchSubmit = page.getByTestId('search-submit');
    this.productCards = page.locator('a.card[data-test^="product-"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.productCards.first()).toBeVisible();
  }

  async openProductByName(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchSubmit.click();
    await this.productCards
      .filter({ has: this.page.getByTestId('product-name').getByText(name, { exact: true }) })
      .first()
      .click();
  }

  async openProductByIndex(index: number): Promise<void> {
    await this.productCards.nth(index).click();
  }
}
