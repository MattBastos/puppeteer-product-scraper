const setLocation = async (page) => {
  try {
    const LOCATION = '11001';

    const openLocationModal = 'span[id="nav-global-location-data-modal-action"]';
    await page.waitForSelector(openLocationModal);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.click(openLocationModal);

    const locationModal = 'div#GLUXSpecifyLocationDiv';
    await page.waitForSelector(locationModal);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const locationInput = 'input#GLUXZipUpdateInput';
    for (const char of LOCATION) {
      await page.type(locationInput, char, { delay: 200 });
    }

    const applyButton = 'span[data-action="GLUXPostalUpdateAction"]'
    await page.waitForSelector(applyButton);
    await page.click(applyButton);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const continueButton = 'span[data-action="GLUXConfirmAction"]';
    await page.waitForSelector(continueButton);
    await page.evaluate((selector) => {
      const button = document.querySelector(selector);
      if (button) button.click();
    }, continueButton);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { setLocation };
