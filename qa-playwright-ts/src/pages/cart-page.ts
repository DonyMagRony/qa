import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  readonly navCart: Locator;
  readonly productTitles: Locator;
  readonly quantities: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navCart = page.getByTestId('nav-cart');
    this.productTitles = page.getByTestId('product-title');
    this.quantities = page.getByTestId('product-quantity');
    this.proceedButton = page.getByTestId('proceed-1');
  }

  async open(): Promise<void> {
    await this.navCart.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedButton.click();
  }
}
