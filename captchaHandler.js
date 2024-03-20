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

  return image.data.text.toUpperCase();
};

const solveCaptcha = async (page) => {
  let isCaptchaSolved = false;

  do {
    try {
      console.log('Tentando resolver captcha...');

      const imageURL = await getCaptchaImageURL(page);
      const textImage = await getTextFromImage(imageURL);

      const captchaInputElement = 'input#captchacharacters';
      await page.type(captchaInputElement, textImage);

      const continueToShoppingBtn = 'button[type="submit"]';
      await page.waitForSelector(continueToShoppingBtn, { timeout: 5000 });
      await page.click(continueToShoppingBtn);

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      isCaptchaSolved = true;
      console.log('Captcha resolvido com sucesso!');
    }
  } while (isCaptchaSolved === false);
};

const verifyCaptcha = async (page) => {
  const isCaptchaPresent = await page.$('form[method="get"][action="/errors/validateCaptcha"]');

  if (isCaptchaPresent) {
    await solveCaptcha(page);
  } else {
    console.log('Nenhum captcha encontrado. Continuando...');
  }
}

module.exports = { verifyCaptcha };
