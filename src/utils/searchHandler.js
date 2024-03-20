const searchProducts = async (page, searchTerm) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const searchInput = 'input#twotabsearchtextbox';
  for (const char of searchTerm) {
    await page.type(searchInput, char, { delay: 200 });
  }

  const searchButton = 'div.nav-search-submit.nav-sprite';
  await page.waitForSelector(searchButton);
  await page.click(searchButton);
};

module.exports = { searchProducts };
