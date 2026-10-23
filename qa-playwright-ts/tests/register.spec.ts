import { test, expect } from '../src/fixtures';
import { newUser } from '../src/data/user-factory';

test.describe('Register a new customer', () => {
  test('creates a unique account and redirects to the login page', async ({
    page,
    registerPage,
    loginPage,
  }) => {
    const user = newUser();

    await registerPage.open();
    await registerPage.register(user);

    // Account created -> user ends up on the login page.
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.submitButton).toBeVisible();

    // The new account really exists: it can sign in.
    await loginPage.login(user.email, user.password);
    await expect(page).toHaveURL(/\/account/);
  });

  test('does not register with an empty form', async ({ page, registerPage }) => {
    await registerPage.open();
    await registerPage.submit();

    await expect(page).toHaveURL(/\/auth\/register/);
    await expect(registerPage.firstNameError).toBeVisible();
  });
});
