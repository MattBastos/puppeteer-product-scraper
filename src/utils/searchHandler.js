const { clickOnElement } = require('./clicker');

const searchProducts = async (page, searchTerm) => {
  console.log('Pesquisando produtos...')

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const searchInput = 'input#twotabsearchtextbox';
    for (const char of searchTerm) {
      await page.type(searchInput, char, { delay: 200 });
    }
  
    const searchButton = 'div.nav-search-submit.nav-sprite';
    await clickOnElement(page, searchButton);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { searchProducts };
