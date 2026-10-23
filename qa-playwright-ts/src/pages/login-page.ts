import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly error: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
    this.error = page.getByTestId('login-error');
    this.forgotPasswordLink = page.getByTestId('forgot-password-link');
  }

  async open(): Promise<void> {
    await this.page.goto('/auth/login');
    await expect(this.submitButton).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}
