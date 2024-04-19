const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the job application page
    await page.goto("https://boards.greenhouse.io/triparc/jobs/4351915007?ref=crackeddevs.com");

    // Fill out the form
    await page.waitForSelector('input[name="job_application[first_name]"]', {
      visible: true,
    });
    await page.type('#first_name', 'Abhijit');
    // await page.type(
    //   'input[name="job_application[email]"]',
    //   "your.roya51788@gmail.com"
    // );
    
    // Wait for confirmation or any other relevant action
    await page.waitForNavigation();

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
