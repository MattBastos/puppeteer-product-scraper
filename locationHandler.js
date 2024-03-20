const setLocation = async (page) => {
  try {
    const LOCATION = '11001';

    const openLocationModal = 'span[id="nav-global-location-data-modal-action"]';
    await page.waitForSelector(openLocationModal);
    await page.click(openLocationModal);

    const locationModal = 'div#GLUXSpecifyLocationDiv';
    await page.waitForSelector(locationModal);

    const locationInput = 'input#GLUXZipUpdateInput';
    for (const char of LOCATION) {
      await page.type(locationInput, char, { delay: 100 });
    }

    const applyButton = 'span[data-action="GLUXPostalUpdateAction"]'
    await page.waitForSelector(applyButton);
    await page.click(applyButton);

    const confirmButton = 'input#GLUXConfirmClose';
    await page.waitForSelector(confirmButton);
    await page.click(confirmButton);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { setLocation };
