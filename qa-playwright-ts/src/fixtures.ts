import { test as base, expect } from '@playwright/test';
import { registerUserViaApi } from './api/users-api';
import { newUser, User } from './data/user-factory';
import { AccountPage } from './pages/account-page';
import { CartPage } from './pages/cart-page';
import { CheckoutPage } from './pages/checkout-page';
import { ComparisonPage } from './pages/comparison-page';
import { ForgotPasswordPage } from './pages/forgot-password-page';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { ProductPage } from './pages/product-page';
import { RegisterPage } from './pages/register-page';

type Fixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  accountPage: AccountPage;
  forgotPasswordPage: ForgotPasswordPage;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  comparisonPage: ComparisonPage;
  /** A brand-new customer created through the API (not logged in). */
  registeredUser: User;
  /** A brand-new customer who is already logged in in the browser. */
  loggedInUser: User;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  accountPage: async ({ page }, use) => use(new AccountPage(page)),
  forgotPasswordPage: async ({ page }, use) => use(new ForgotPasswordPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  comparisonPage: async ({ page }, use) => use(new ComparisonPage(page)),

  registeredUser: async ({ request }, use) => {
    const user = newUser();
    await registerUserViaApi(request, user);
    await use(user);
  },

  loggedInUser: async ({ page, loginPage, registeredUser }, use) => {
    await loginPage.open();
    await loginPage.login(registeredUser.email, registeredUser.password);
    await expect(page).toHaveURL(/\/account/);
    await use(registeredUser);
  },
});

export { expect };
