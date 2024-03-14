const puppeteer = require("puppeteer");
const { getCaptchaImageURL, getTextFromImage } = require("./captchaHandler");

(async () => {
  const ADDRESS = 11001;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.goto('https://www.amazon.com/');
  await page.setViewport({ width: 1080, height: 1024 });

  const imageURL = await getCaptchaImageURL(page);
  const textImage = await getTextFromImage(imageURL);

  console.log(textImage);

  // const changeAddressButton = await page.waitForSelector('span.a-button-inner input[data-action-type="SELECT_LOCATION"]');
  // await page.click(changeAddressButton);

  // const addressInput = await page.waitForSelector('input.GLUX_Full_Width#GLUXZipUpdateInput');

  // await browser.close();
})();
