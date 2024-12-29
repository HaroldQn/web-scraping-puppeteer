import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500
  });
  const page = await browser.newPage();
  await page.goto('https://exampe.com');

  await browser.close();
} 

//openWebPage();

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
} 

// captureScreenshot();

async function clickPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400
  });
  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com');
  await page.click('a[href="/login"]');
  await new Promise((r) => setTimeout(r, 5000));
  await browser.close();
} 

//clickPage();

async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const result = await page.evaluate(() =>{
    const title = document.querySelector('h1').innerText
    const description = document.querySelector('p').innerText
    const more = document.querySelector('a').innerText
    return {title, description, more}
  })
  console.log(result);
  await browser.close();
} 
//getDataFromWebPage();


async function handelDynamicWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400
  });
  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com');

  const result = await page.evaluate(() =>{
    const quotes = document.querySelectorAll('.quote');
    const data = [...quotes].map((quote) => {
      const quoteText = quote.querySelector('.text').innerText
      const author = quote.querySelector('.author').innerText
      const tags = [...quote.querySelectorAll('.tag')].map((tag) => tag.innerText)
      return {quoteText, author, tags}
    })
    return data
  })
  console.log(result);

  fs.writeFile('quotes.json', JSON.stringify(result, null, 2));

  await browser.close();
} 

handelDynamicWebPage();