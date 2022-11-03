import puppeteer from 'puppeteer';
import Tesseract from 'tesseract.js';
import moment from 'moment';
import md5 from 'md5';

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
    maxCaptchaTrial: number;

    constructor(accountId: string, password: string) {
        super()
        this.accountId = accountId;
        this.password = password;
        this.maxCaptchaTrial = 20;
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
            while (trial < this.maxCaptchaTrial) {
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
            console.log(captchaText)
            await this.page.type('#AuthenticationFG\\.ACCESS_CODE', this.password);
            await this.page.type('#AuthenticationFG\\.USER_PRINCIPAL', this.accountId);
            await this.page.type('#AuthenticationFG\\.VERIFICATION_CODE', captchaText);

            this.loggedIn = true;
            console.log("loggedIn")
        } catch (e) {
            console.log(e)
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
                await this.page.waitForSelector("#Informasi-Saldo--Mutasi_Saldo-Rekening");
                await this.page.click("#Informasi-Saldo--Mutasi_Saldo-Rekening")

                console.log("eval")
                await this.page.waitForSelector("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]");
                const currentBalance = await this.page.$eval("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]", el => el.innerHTML)
                return parseInt(currentBalance);
            }
            throw new Error("User is not logged in")
        } catch {
            await this.logout()
        }
    }

    async getTransactions(startAt: Date, endAt: Date): Promise<BankTransaction[]> {
        if (this.loggedIn) {
            console.log("click rekening")
            await this.page.waitForSelector("#REKENING");
            await this.page.click("#REKENING")

            console.log("click saldo")
            await this.page.waitForSelector("#Informasi-Saldo--Mutasi_Saldo-Rekening");
            await this.page.click("#Informasi-Saldo--Mutasi_Saldo-Rekening")

            console.log("balance")
            await this.page.waitForSelector("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]");
            await this.page.click("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]")

            await this.page.waitForSelector("#HREF_AccountSummaryFG\\.ACCOUNT_NUMBER_ARRAY\\[0\\]")
            const accountNum = await this.page.$eval("#HREF_AccountSummaryFG\\.ACCOUNT_NUMBER_ARRAY\\[0\\]", el => el.innerHTML)

            console.log("transaction")
            await this.page.waitForSelector("#TRANSACTION_CATEGORIZATION");
            await this.page.click("#TRANSACTION_CATEGORIZATION")

            await this.page.waitForSelector("#SearchPanel\\.SubSection2\\.collapsibleImage");
            await this.page.click("#SearchPanel\\.SubSection2\\.collapsibleImage")

            await this.page.type('#TransactionHistoryFG\\.FROM_TXN_DATE', moment(startAt).format("DD-MMM-YYYY"));
            await this.page.type('#TransactionHistoryFG\\.TO_TXN_DATE', moment(endAt).format("DD-MMM-YYYY"));

            // uncomment for seeing moment date result
            // await this.page.waitForNavigation()
            console.log("clicking")
            await this.page.waitForSelector("#SEARCH");
            await this.page.click("#SEARCH")
            console.log("wait")
            await this.page.waitForNavigation()

            const tableDatas = await this.page.$$eval('#txnHistoryList tr.listwhiterow,.listgreyrow', rows => {
                return Array.from(rows, row => {
                    const rawColumns = row.querySelectorAll('td');
                    return Array.from(rawColumns, column => column.innerText);
                });
            });

            const transactions = tableDatas.map((data) => {
                const transactionDate = moment(data[1], "DD-MMM-YYYY").toDate()
                const transactionName = data[2]
                const transactionType = data[4].slice(0, 2).toUpperCase() as "CR" | "DB"
                const transactionAmount = parseFloat(data[5].replace(/,/g, ""))
                const externalId = md5(data[1] + data[2] + data[4] + data[5])

                return {
                    bankCode: "BNI",
                    accountNum,
                    transactionDate,
                    transactionType,
                    transactionAmount,
                    transactionName,
                    externalId,
                }
            })

            console.log(transactions)
            // #Action\.OpTransactionListingTpr_custom\.GOTO_NEXT__
            return transactions
        }
        return [];
    }

    async logout() {
        await this.page.waitForSelector("HREF_Logout");
        await this.page.click("#HREF_Logout")
        await this.page.waitForSelector("#LOG_OUT");
        await this.page.click("#LOG_OUT")
        await this.browser.close()
    }
}

const scraper = new BniBankScraper(process.env.ACCOUNT, process.env.PASSWORD);
scraper.init().then(() => scraper.login().then(() => scraper.getTransactions(moment('20-10-2022', 'DD-MM-YYYY').toDate(), new Date()).then(() => scraper.logout())))
