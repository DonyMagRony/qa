import { test, expect } from '../src/fixtures';

const PRODUCT = 'Combination Pliers';

test.describe('Buy a product', () => {
  test('add to cart -> cart shows the item and quantity -> checkout completes', async ({
    homePage,
    productPage,
    cartPage,
    checkoutPage,
    loggedInUser,
  }) => {
    // Find the product and add it to the cart
    await homePage.open();
    await homePage.openProductByName(PRODUCT);
    await expect(productPage.name).toHaveText(PRODUCT);
    await productPage.addToCart();
    await expect(productPage.cartQuantity).toHaveText('1');

    // Cart shows the right item and quantity
    await cartPage.open();
    await expect(cartPage.productTitles).toHaveCount(1);
    await expect(cartPage.productTitles.first()).toContainText(PRODUCT);
    await expect(cartPage.quantities.first()).toHaveValue('1');

    // Checkout: sign-in step (already logged in) -> address -> payment -> confirm
    await cartPage.proceedToCheckout();
    await checkoutPage.continueAfterSignIn();
    await checkoutPage.fillAddressAndContinue(loggedInUser.address);
    await checkoutPage.payWithBuyNowPayLater('3');

    await expect(checkoutPage.orderConfirmation).toBeVisible();
    await expect(checkoutPage.orderConfirmation).toContainText('Thanks for your order');
  });
});
