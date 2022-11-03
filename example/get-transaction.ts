import scraper from 'payable-scraper';
import moment from 'moment';

async function main() {
    const accountId = process.env.ACCOUNT_ID;
    const password = process.env.PASSWORD;
    const bniScraper = await scraper().pickEngine('puppeteer').pickScraper("BNI").setCreds({ accountId, password }).build();
    await bniScraper.login()

    const previousDate = moment('20-10-2022', 'DD-MM-YYYY').toDate();
    const currentDate = new Date();

    const transactions = await bniScraper.getTransactions(previousDate, currentDate)

    console.table(transactions)
    await bniScraper.logout()
}

main()
