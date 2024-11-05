const puppeteer = require('puppeteer');
const player = require('play-sound')(opts = {});
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/login');
  await page.waitForSelector('input[name="session_key"]', { visible: true });
  await page.type('input[name="session_key"]', 'abhijitagore2000@gmail.com');
  await page.waitForSelector('input[name="session_password"]', { visible: true });
  await page.type('input[name="session_password"]', 'Abhi@24112000'); 
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.goto('https://www.linkedin.com/jobs/search/?keywords=software%20developer&location=Pune%2C%20Maharashtra%2C%20India');
  await page.waitForSelector('li.result-card.job-result-card');
  const jobPostings = await page.$$eval('li.result-card.job-result-card', elements => elements.map(element => element.href));
  for (const jobPosting of jobPostings) {
    await page.goto(jobPosting);
    const easyApplyButton = await page.$('button[aria-label="Easy Apply"]');
    if (easyApplyButton) {  
      await easyApplyButton.click();
      await page.waitForSelector('input[name="first-name"]', { visible: true });
      await page.type('input[name="first-name"]', 'Abhijit'); 
      await page.type('input[name="last-name"]', 'Gore');
      await page.type('input[name="email"]', 'abhijitagore2000@gmail.com'); 
      await page.type('input[name="phone"]', '+91 8605341106');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(2000);
      player.play('./bossVoice.mp3', function(err){
        if (err) throw err;
      });   
      await page.waitForTimeout(2000);
    }
  }
})();