const { createWorker } = require('tesseract.js');

const getCaptchaImageURL = async (page) => {
  try {
    await page.waitForSelector('form[method="get"][action="/errors/validateCaptcha"]');

    const src = await page.evaluate(() => {
      const formElement = document.querySelector('form[method="get"][action="/errors/validateCaptcha"]');

      if (formElement) {
        const image = formElement.querySelector('img');
        return image ? image.src : null;
      } else {
        return null;
      }
    });
  
    return src;
  } catch (error) {
    console.error(error);
  }
};

const getTextFromImage = async (imageURL) => {
  const worker = await createWorker('eng');
  const image = await worker.recognize(imageURL);
  await worker.terminate();

  return image.data.text;
};

module.exports = {
  getTextFromImage,
  getCaptchaImageURL
};
