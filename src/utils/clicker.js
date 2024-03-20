const clickOnElement = async (page, element) => {
  try {
    await page.waitForSelector(element);
    await page.click(element);
  } catch (error) {
    console.error(error);
  }
};

const clickOnElementWithDelay = async (page, element, delay) => {
  try {
    await page.waitForSelector(element, { timeout: delay });
    await page.click(element);
  } catch (error) {
    console.error(error);
  }
};

const clickOnElementWithEvaluate = async (page, element) => {
  try {
    await page.waitForSelector(element);
    await page.evaluate((selector) => {
      const button = document.querySelector(selector);
      if (button) button.click();
    }, element);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  clickOnElement,
  clickOnElementWithDelay,
  clickOnElementWithEvaluate
};
