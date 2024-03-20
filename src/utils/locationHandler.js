const { clickOnElement, clickOnElementWithEvaluate } = require('./clicker');

const setLocation = async (page) => {
  console.log('Definindo a localização...');

  try {
    const LOCATION = '11001';

    await new Promise(resolve => setTimeout(resolve, 5000));
    const openLocationModal = 'span[id="nav-global-location-data-modal-action"]';
    await clickOnElement(page, openLocationModal);

    const locationModal = 'div#GLUXSpecifyLocationDiv';
    await page.waitForSelector(locationModal);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const locationInput = 'input#GLUXZipUpdateInput';
    for (const char of LOCATION) {
      await page.type(locationInput, char, { delay: 200 });
    }

    const applyButton = 'span[data-action="GLUXPostalUpdateAction"]'
    await clickOnElement(page, applyButton);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const continueButton = 'span[data-action="GLUXConfirmAction"]';
    await clickOnElementWithEvaluate(page, continueButton);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { setLocation };
