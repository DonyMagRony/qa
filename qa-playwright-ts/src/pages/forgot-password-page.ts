import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class ForgotPasswordPage extends BasePage {
  readonly form: Locator;
  readonly email: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;
  readonly errorAlert: Locator;
  readonly emailFormatError: Locator;

  constructor(page: Page) {
    super(page);
    this.form = page.getByTestId('forgot-password-form');
    this.email = this.form.getByTestId('email');
    this.submitButton = page.getByTestId('forgot-password-submit');
    this.successAlert = this.form.locator('.alert-success');
    // Server-side error (unknown e-mail). Client-side validation uses [data-test=email-error].
    this.errorAlert = this.form.locator('.alert-danger[role="alert"]');
    this.emailFormatError = page.getByTestId('email-error');
  }

  async open(): Promise<void> {
    await this.page.goto('/auth/forgot-password');
    await expect(this.form).toBeVisible();
  }

  async requestReset(email: string): Promise<void> {
    await this.email.fill(email);
    await this.submitButton.click();
  }
}
