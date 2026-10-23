import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { Address } from '../data/user-factory';

export class CheckoutPage extends BasePage {
  readonly signInProceed: Locator;
  readonly street: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly postalCode: Locator;
  readonly houseNumber: Locator;
  readonly addressProceed: Locator;
  readonly paymentMethod: Locator;
  readonly installments: Locator;
  readonly finishButton: Locator;
  readonly paymentSuccessMessage: Locator;
  readonly orderConfirmation: Locator;

  constructor(page: Page) {
    super(page);
    this.signInProceed = page.getByTestId('proceed-2');
    this.street = page.getByTestId('street');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.postalCode = page.getByTestId('postal_code');
    this.houseNumber = page.getByTestId('house_number');
    this.addressProceed = page.getByTestId('proceed-3');
    this.paymentMethod = page.getByTestId('payment-method');
    this.installments = page.getByTestId('monthly_installments');
    this.finishButton = page.getByTestId('finish');
    this.paymentSuccessMessage = page.getByTestId('payment-success-message');
    this.orderConfirmation = page.locator('#order-confirmation');
  }

  /** Step 2 (sign in). The customer is already logged in, so just continue. */
  async continueAfterSignIn(): Promise<void> {
    await this.signInProceed.click();
  }

  /** Step 3 (billing address). Saved address is pre-filled; house number is not, so fill everything. */
  async fillAddressAndContinue(address: Address): Promise<void> {
    await this.street.fill(address.street);
    await this.city.fill(address.city);
    await this.state.fill(address.state);
    await this.postalCode.fill(address.postalCode);
    await this.houseNumber.fill(address.houseNumber);
    await this.addressProceed.click();
  }

  /**
   * Step 4 (payment). The site needs two clicks on the same button:
   * 1st "Check payment" validates the payment, 2nd "Confirm" places the order.
   */
  async payWithBuyNowPayLater(monthlyInstallments = '3'): Promise<void> {
    await this.paymentMethod.selectOption('buy-now-pay-later');
    await this.installments.selectOption(monthlyInstallments);

    await this.finishButton.click();
    await expect(this.paymentSuccessMessage).toBeVisible();

    await this.finishButton.click();
  }
}
