import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { User } from '../data/user-factory';

export class RegisterPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dob: Locator;
  readonly street: Locator;
  readonly postalCode: Locator;
  readonly houseNumber: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly firstNameError: Locator;
  readonly postcodeLookupLoading: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.dob = page.getByTestId('dob');
    this.street = page.getByTestId('street');
    this.postalCode = page.getByTestId('postal_code');
    this.houseNumber = page.getByTestId('house_number');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.phone = page.getByTestId('phone');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submitButton = page.getByTestId('register-submit');
    this.firstNameError = page.getByTestId('first-name-error');
    this.postcodeLookupLoading = page.getByTestId('postcode-lookup-loading');
  }

  async open(): Promise<void> {
    await this.page.goto('/auth/register');
    await expect(this.firstName).toBeVisible();
  }

  async fillForm(user: User): Promise<void> {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dob.fill(user.dob);

    // Country + postal code + house number may trigger an async postcode lookup
    // that auto-fills street/city/state. Let it settle first, then fill our values.
    await this.country.selectOption(user.address.country);
    await this.postalCode.fill(user.address.postalCode);
    await this.houseNumber.fill(user.address.houseNumber);
    await expect(this.postcodeLookupLoading).toBeHidden();

    await this.street.fill(user.address.street);
    await this.city.fill(user.address.city);
    await this.state.fill(user.address.state);
    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    // The form validates on blur, so leave the last field explicitly.
    await this.password.blur();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async register(user: User): Promise<void> {
    await this.fillForm(user);
    await this.submit();
  }
}
