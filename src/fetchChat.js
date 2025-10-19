const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function fetchChat(url) {
  const messages = [];

  // 1. Launch a headless browser instance using Puppeteer.
  const browser = await puppeteer.launch({
    headless: true, // Set to false to see the browser in action for debugging
  });

  // 2. Create a new page in the browser.
  const page = await browser.newPage();
  console.log(`Navigating to ${url}...`);

  try {
    // 3. Navigate to the target URL.
    //    `waitUntil: 'domcontentloaded'` waits for the initial HTML to load.
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // 4. Wait for the specific dynamic content to appear on the page.
    await page.waitForSelector(".whitespace-pre-wrap", { timeout: 10000 });
    console.log("Dynamic content loaded.");

    // 5. Get the complete, rendered HTML content of the page after all scripts have run.
    const htmlContent = await page.content();
    console.log("Retrieved page content.");

    // 6. Close the browser instance to free up resources.
    await browser.close();
    console.log("Browser closed.");

    // 7. Load the HTML content into Cheerio for fast, efficient parsing.
    const $ = cheerio.load(htmlContent);

    // 8. Select and extract data
    $("div").each((i, el) => {
      const role = $(el).find("div.whitespace-pre-wrap").text();
      const text = $(el).find("div.markdown.prose").text();

      if (role && text) {
        messages.push({ role, text });
      }
    });
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    // Ensure the browser is closed even if an error occurs.
    if (browser) {
      await browser.close();
    }
  }

  return messages;
}

module.exports = fetchChat;
