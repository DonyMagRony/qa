import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AccountPage extends BasePage {
  readonly title: Locator;
  readonly navMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('page-title');
    this.navMenu = page.getByTestId('nav-menu');
  }
}
