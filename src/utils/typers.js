const typeOnInputWithDelay = async (page, element, content) => {
  for (const char of content) {
    await page.type(element, char, { delay: 200 });
  }
}

module.exports = { typeOnInputWithDelay };
