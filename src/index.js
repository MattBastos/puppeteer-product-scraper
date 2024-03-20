const puppeteer = require("puppeteer");

const { verifyCaptcha } = require("./utils/captchaHandler");
const { setLocation } = require('./utils/locationHandler');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.goto('https://www.amazon.com/');
  await page.setViewport({ width: 1624, height: 1080 });

  await verifyCaptcha(page);

  await setLocation(page);

  // await browser.close();
})();
