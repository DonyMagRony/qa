import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductPage extends BasePage {
  readonly name: Locator;
  readonly unitPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addToCompareButton: Locator;
  readonly comparisonBar: Locator;
  readonly compareLink: Locator;
  readonly cartQuantity: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.getByTestId('product-name');
    this.unitPrice = page.getByTestId('unit-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addToCompareButton = page.getByTestId('add-to-compare');
    this.comparisonBar = page.getByTestId('comparison-bar');
    this.compareLink = page.getByTestId('compare-link');
    this.cartQuantity = page.getByTestId('cart-quantity');
  }

  /** Waits for the product to render and returns its name and price as shown on the page. */
  async readNameAndPrice(): Promise<{ name: string; price: string }> {
    await expect(this.name).toHaveText(/\S/);
    await expect(this.unitPrice).toHaveText(/\d/);
    return {
      name: (await this.name.innerText()).trim(),
      price: (await this.unitPrice.innerText()).trim(),
    };
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async addToCompare(): Promise<void> {
    await this.addToCompareButton.click();
  }
}
