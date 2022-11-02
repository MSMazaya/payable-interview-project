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
    abstract login(): void
    abstract getCurrentBalance(): Promise<number>
    abstract getTransactions(startAt: Date, endAt: Date): Promise<BankTransaction[]>
    abstract logout(): void
}

class BniBankScraper extends BaseBankScraper {
    accountId: string;
    password: string;
    loggedIn: boolean;
    browser: puppeteer.Browser;
    page: puppeteer.Page;

    constructor(accountId: string, password: string) {
        super()
        this.accountId = accountId;
        this.password = password;
        this.loggedIn = false;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: false
        });
        this.page = await this.browser.newPage();
    }

    async login() {
        try {

            await this.page.goto('https://ibank.bni.co.id');

            let trial = 0;
            let captchaText = "";
            console.log("captcha")
            while (trial < 20) {
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

            console.log("typing ", trial)
            await this.page.type('#AuthenticationFG\\.ACCESS_CODE', this.password);
            await this.page.type('#AuthenticationFG\\.USER_PRINCIPAL', this.accountId);
            await this.page.type('#AuthenticationFG\\.VERIFICATION_CODE', captchaText);

            this.loggedIn = true;
            console.log("loggedIn")
        } catch {
            await this.logout()
        }
    }

    async getCurrentBalance(): Promise<number> {
        try {
            if (this.loggedIn) {
                console.log("click rekening")
                await this.page.waitForSelector("#REKENING");
                await this.page.click("#REKENING")

                console.log("click saldo")
                await this.page.waitForSelector("#Informasi\-Saldo\-\-Mutasi\_Saldo\-Rekening");
                await this.page.click("#Informasi\-Saldo\-\-Mutasi\_Saldo\-Rekening")


                console.log("eval")
                await this.page.waitForSelector("#HREF\_AccountSummaryFG\\.BALANCE\_ARRAY\\[0\\]");
                const currentBalance = await this.page.$eval("#HREF\_AccountSummaryFG\\.BALANCE\_ARRAY\\[0\\]", el => el.innerHTML)
                return parseInt(currentBalance);
            }
            throw new Error("User is not logged in")
        } catch {
            await this.logout()
        }
    }

    async getTransactions(startAt: Date, endAt: Date): Promise<BankTransaction[]> {
        return [];
    }

    async logout() {
        await this.page.click("#HREF_Logout")
        await this.page.click("#LOG_OUT")
        await this.browser.close()
    }
}

const scraper = new BniBankScraper(process.env.ACCOUNT, process.env.PASSWORD);
scraper.init().then(() => scraper.login().then(() => scraper.getCurrentBalance().then(() => scraper.logout())))
