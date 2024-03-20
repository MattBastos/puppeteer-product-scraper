const { clickOnElement } = require('./clicker');

const getFirstNonSponsoredProduct = async (page) => {
  console.log('Selecionando produto...');

  try {
    await page.evaluate(async () => {
      const productElements = document.querySelectorAll('.a-section.a-spacing-base');

      const firstNonSponsoredElement = Array.from(productElements).find(element => {
        const sponsoredElement = element.querySelector('span.a-color-secondary');
        return !sponsoredElement || sponsoredElement.textContent.trim() !== 'Sponsored';
      });

      await clickOnElement(page, firstNonSponsoredElement);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getFirstNonSponsoredProduct };
