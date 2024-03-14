const puppeteer = require("puppeteer");

const { solveCaptcha } = require("./captchaHandler");

(async () => {
  const ADDRESS = 11001;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.goto('https://www.amazon.com/');
  await page.setViewport({ width: 1080, height: 1024 });

  await solveCaptcha(page);

  const locationSelector = 'input[data-action-type="SELECT_LOCATION"]';
  await page.waitForSelector(locationSelector);
  await page.click(locationSelector);

  // await browser.close();
})();
