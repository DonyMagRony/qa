import { test, expect } from '../src/fixtures';

test.describe('Log in', () => {
  test('valid credentials reach the account page', async ({
    page,
    loginPage,
    accountPage,
    registeredUser,
  }) => {
    await loginPage.open();
    await loginPage.login(registeredUser.email, registeredUser.password);

    await expect(page).toHaveURL(/\/account/);
    await expect(accountPage.title).toBeVisible();
    await expect(accountPage.navMenu).toContainText(registeredUser.firstName);
  });

  test('invalid credentials show an error and do not log in', async ({
    page,
    loginPage,
    registeredUser,
  }) => {
    await loginPage.open();
    await loginPage.login(registeredUser.email, 'WrongPassword!1');

    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toContainText('Invalid email or password');
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page).not.toHaveURL(/\/account/);
  });
});
