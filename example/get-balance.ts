import scraper from 'payable-scraper';

async function main() {
    const accountId = process.env.ACCOUNT_ID;
    const password = process.env.PASSWORD;
    const bniScraper = await scraper().pickEngine('puppeteer').pickScraper("BNI").setCreds({ accountId, password }).build();
    await bniScraper.login()

    const balance = await bniScraper.getCurrentBalance()

    console.log("You have Rp" + balance + " balance in your account")
    await bniScraper.logout()
}

main()
