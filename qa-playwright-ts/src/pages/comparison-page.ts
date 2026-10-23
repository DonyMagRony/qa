import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ComparisonPage extends BasePage {
  readonly table: Locator;
  readonly names: Locator;
  readonly prices: Locator;

  constructor(page: Page) {
    super(page);
    this.table = page.getByTestId('comparison-table');
    this.names = this.table.getByTestId('product-name');
    this.prices = this.table.getByTestId('compare-price');
  }
}
