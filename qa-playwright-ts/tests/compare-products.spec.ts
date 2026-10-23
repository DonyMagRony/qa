import { test, expect } from '../src/fixtures';

test.describe('Compare two products', () => {
  test('both products appear on the comparison page with the same name and price', async ({
    page,
    homePage,
    productPage,
    comparisonPage,
  }) => {
    // Product 1: open, capture name + price, add to comparison
    await homePage.open();
    await homePage.openProductByIndex(0);
    const first = await productPage.readNameAndPrice();
    await productPage.addToCompare();

    // Product 2: a different product from the catalogue
    await homePage.open(); // full reload keeps the comparison list (sessionStorage)
    await homePage.openProductByIndex(1);
    const second = await productPage.readNameAndPrice();
    expect(second.name).not.toBe(first.name);
    await productPage.addToCompare();

    // Open the comparison (the bar appears once 2+ products are selected)
    await expect(productPage.comparisonBar).toBeVisible();
    await productPage.compareLink.click();
    await expect(page).toHaveURL(/\/comparison/);

    // Assert exactly what we stated: two products, in order, with the captured name and price
    await expect(comparisonPage.table).toBeVisible();
    await expect(comparisonPage.names).toHaveCount(2);
    await expect(comparisonPage.names).toHaveText([first.name, second.name]);
    await expect(comparisonPage.prices).toHaveText([`$${first.price}`, `$${second.price}`]);
  });
});
