const puppeteer = require("puppeteer");

const { solveCaptcha } = require("./captchaHandler");
const { setLocation } = require('./locationHandler');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.goto('https://www.amazon.com/');
  await page.setViewport({ width: 1080, height: 1024 });

  await solveCaptcha(page);

  await setLocation(page);

  // await browser.close();
})();
