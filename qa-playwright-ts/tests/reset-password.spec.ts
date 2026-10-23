import { test, expect } from '../src/fixtures';
import { uniqueEmail } from '../src/data/user-factory';

test.describe('Reset a password', () => {
  test('a known e-mail gets the confirmation', async ({
  loginPage,
  forgotPasswordPage,
  page,
  registeredUser,
}) => {
  await loginPage.open();
  await loginPage.forgotPasswordLink.click();
  await expect(page).toHaveURL(/\/auth\/forgot-password/);

  await forgotPasswordPage.requestReset(registeredUser.email);

  await expect(forgotPasswordPage.successAlert).toBeVisible();
  await expect(forgotPasswordPage.errorAlert).toBeHidden();

  test.info().annotations.push({
    type: 'known-bug',
    description: 'Forgot-password confirmation shows raw key "page.forgot-password.confirm"',
  });
});

  test('a malformed e-mail shows a validation error', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.requestReset('not-an-email');

    await expect(forgotPasswordPage.emailFormatError).toBeVisible();
    await expect(forgotPasswordPage.successAlert).toBeHidden();
  });

  test('an unknown e-mail shows an error', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.requestReset(uniqueEmail('nobody'));

    await expect(forgotPasswordPage.errorAlert).toBeVisible();
    await expect(forgotPasswordPage.successAlert).toBeHidden();
  });
});
