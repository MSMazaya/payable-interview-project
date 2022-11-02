import puppeteer from 'puppeteer';
import Tesseract from 'tesseract.js';

interface BankTransaction {
    bankCode: string;
    accountNum: string;
    transactionDate: Date;
    transactionType: "CR" | "DB"; // credit or debit
    transactionAmount: number;
    transactionName: string;
    externalId: string;
}

abstract class BaseBankScraper {
    abstract login()
    abstract getCurrentBalance(): number
    abstract getTransactions(startAt: Date, endAt: Date): BankTransaction[]
    abstract logout()
}

class BniBankScraper extends BaseBankScraper {
    accountId: string;
    password: string;
    browser: puppeteer.Browser;
    page: puppeteer.Page;

    constructor(accountId: string, password: string) {
        super()
        this.accountId = accountId;
        this.password = password;
    }

    async init() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    async login() {

        await this.page.goto('https://ibank.bni.co.id');

        let trial = 0;
        let captchaText = "";
        while (trial < 3) {
            const captcha = await this.page.$('#IMAGECAPTCHA');
            const captchaImage = await captcha.screenshot();

            const { data: { text } } = await Tesseract.recognize(
                captchaImage,
                'eng',
            )

            if (text !== "") {
                captchaText = text;
                break;
            }

            await this.page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            trial += 1
        }

        await this.page.type('#AuthenticationFG\\.ACCESS_CODE', this.password);
        await this.page.type('#AuthenticationFG\\.USER_PRINCIPAL', this.accountId);
        await this.page.type('#AuthenticationFG\\.VERIFICATION_CODE', captchaText);

        console.log(this.page.url());

        // screenshot
        await this.page.screenshot({ path: 'example.png' });

        // await this.page.click('#VALIDATE_CREDENTIALS');

        console.log(this.page.url());

    }

    getCurrentBalance(): number {
        /*
        #REKENING
        #Informasi-Saldo--Mutasi_Saldo-Rekening
        #TRANSACTION_CATEGORIZATION
        */

        return 0;
    }

    getTransactions(startAt: Date, endAt: Date): BankTransaction[] {
        return [];
    }

    async logout() {
        await this.browser.close()
    }
}

const scraper = new BniBankScraper(process.env.ACCOUNT, process.env.PASSWORD);
scraper.init().then(() => scraper.login().then(() => scraper.logout()))
