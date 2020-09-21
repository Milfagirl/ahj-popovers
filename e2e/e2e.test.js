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
  test('should add .cardvisible class for valid card', async () => {
    await page.goto(baseUrl);
    const form = await page.$('form');
    const input = await form.$('input');
    await input.type('5555555555554444');
    const submit = await form.$('button');
    submit.click();
    await page.waitFor('[data-title= master].cardvisible');
  });
})
