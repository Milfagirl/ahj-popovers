/* eslint-disable semi */
/* eslint-disable spaced-comment */
import puppetteer from 'puppeteer';

const { fork } = require('child_process');

jest.setTimeout(30000);
describe('Validation', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      //headless: false,
      //slowMo: 100,
      //devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  test('should add change display block', async () => {
    await page.goto(baseUrl);
    const button = await page.$('button');
    const container = await page.$('.container');
    const popover = await container.$('.popover_content');
    button.click();
    await popover.waitFor(popover.style.display = 'block');
  });
})
