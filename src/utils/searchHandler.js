const { clickOnElement } = require('./clicker');
const { typeOnInputWithDelay } = require('./typers');

const searchProducts = async (page, searchTerm) => {
  console.log('Pesquisando produtos...')

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const searchInput = 'input#twotabsearchtextbox';
    await typeOnInputWithDelay(page, searchInput, searchTerm);
  
    const searchButton = 'div.nav-search-submit.nav-sprite';
    await clickOnElement(page, searchButton);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { searchProducts };
