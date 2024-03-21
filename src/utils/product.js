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

const getTextFromElement = async (page, selector) => {
  try {
    await page.waitForSelector(selector);

    const text = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : null;
    }, selector);
  
    return text;
  } catch (error) {
    console.error(error);
  } 
};

const getTextFromList = async (page, selector) => {
  try {
    await page.waitForSelector(selector);

    const items = await page.evaluate(selector => {
      const list = document.querySelector(selector);
  
      if (!list) return [];
  
      const items = Array.from(list.querySelectorAll('li'));
      return items.map(item => item.textContent.trim());
    }, selector);

    return items;
  } catch (error) {
    console.error(error);
  }
};

const getFormattedProductPrice = async (page) => {
  try {
    const priceSymbol = await getTextFromElement(page, '.a-price-symbol');
    const priceWhole = await getTextFromElement(page, '.a-price-whole');
    const priceFraction = await getTextFromElement(page, '.a-price-fraction');
  
    return `${priceSymbol} ${priceWhole}${priceFraction}`;
  } catch (error) {
    console.error(error);
  }
};

const getFormattedProductRating = async (page) => {
  try {
    const rating = await getTextFromElement(page, '.reviewCountTextLinkedHistogram.noUnderline');
    
    const regex = /(\d+(\.\d+)?) out of 5 stars/;
    const match = rating.match(regex);

    return match[0];
  } catch (error) {
    console.error(error);
  }
};

const printProductData = async (page) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const title = await getTextFromElement(page, '#productTitle');
    const about = await getTextFromList(page, 'ul.a-unordered-list.a-vertical.a-spacing-mini');
    const price = await getFormattedProductPrice(page);
    const lastMonthSales = await getTextFromElement(page, '.a-text-italic');
    const reviewsQuantity = await getTextFromElement(page, '#acrCustomerReviewText');
    const rating = await getFormattedProductRating(page);
  
    const product = {
      title,
      about,
      price,
      lastMonthSales: `${lastMonthSales} in past month`,
      reviewsQuantity,
      rating
    };
  
    console.log(product);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { selectFirstNonSponsoredProduct, printProductData };
