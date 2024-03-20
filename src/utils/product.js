const selectFirstNonSponsoredProduct = async (page) => {
  console.log('Selecionando produto...');

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.waitForSelector('div[data-component-type="s-search-result"]');
    const searchResultProducts = await page.$$('div[data-component-type="s-search-result"]');

    let firstNonSponsoredProduct;

    for (const product of searchResultProducts) {
      const sponsoredProduct = await product.$('.puis-label-popover.puis-sponsored-label-text');
      if (!sponsoredProduct) {
        firstNonSponsoredProduct = product;
        break;
      }
    }

    if (firstNonSponsoredProduct) await firstNonSponsoredProduct.click('img.s-image');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { selectFirstNonSponsoredProduct };
