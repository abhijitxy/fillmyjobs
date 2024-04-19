const puppeteer = require("puppeteer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fetch data from the database
const getData = async () => {
  const data = await prisma.resume.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
};


(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const data = await getData();
    await page.goto("https://boards.greenhouse.io/triparc/jobs/4351915007?ref=crackeddevs.com");

    await page.waitForSelector('input[name="job_application[first_name]"]', {
      visible: true,
    });
    await page.type('#first_name', data.fullName); 
    await page.type('#email', data.email); 
    
    await page.waitForNavigation();

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
