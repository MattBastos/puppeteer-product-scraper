const { clickOnElement, clickOnElementWithEvaluate } = require('./clicker');
const { typeOnInputWithDelay } = require('./typers');

const setLocation = async (page, location) => {
  console.log('Definindo a localização...');

  try {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const openLocationModal = 'span[id="nav-global-location-data-modal-action"]';
    await clickOnElement(page, openLocationModal);

    const locationModal = 'div#GLUXSpecifyLocationDiv';
    await page.waitForSelector(locationModal);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const locationInput = 'input#GLUXZipUpdateInput';
    await typeOnInputWithDelay(page, locationInput, location);

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
