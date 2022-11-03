import moment from 'moment';
import BaseBankScraper from "./base-scraper";
import BankTransaction from '../types/bank-transaction';
import BaseEngine from '../engine/base-engine';
import captcha from '../utils/captcha';
import hash from '../utils/hash'

export default class BniBankScraper extends BaseBankScraper {
    accountId: string;
    password: string;
    loggedIn: boolean;
    egine: BaseEngine;
    maxCaptchaTrial: number;

    constructor(accountId: string, password: string, engine: BaseEngine) {
        super()
        this.accountId = accountId;
        this.password = password;
        this.engine = engine;
        this.maxCaptchaTrial = 20;
        this.loggedIn = false;
    }

    async login() {
        try {
            await this.engine.goto('https://ibank.bni.co.id');

            let trial = 0;
            let captchaText = "";
            while (trial < this.maxCaptchaTrial) {
                const captchaImage = await this.engine.getScreenshot("#IMAGECAPTCHA");

                const [failed, text] = await captcha.imageToText(captchaImage)

                if (!failed) {
                    captchaText = text;
                    break;
                }

                await this.engine.reload()
                trial += 1
            }

            await this.engine.type('#AuthenticationFG\\.ACCESS_CODE', this.password);
            await this.engine.type('#AuthenticationFG\\.USER_PRINCIPAL', this.accountId);
            await this.engine.type('#AuthenticationFG\\.VERIFICATION_CODE', captchaText);

            this.loggedIn = true;
        } catch (e) {
            await this.logout()
        }
    }

    async getCurrentBalance(): Promise<number> {
        try {
            if (this.loggedIn) {
                await this.engine.click("#REKENING")

                await this.engine.click("#Informasi-Saldo--Mutasi_Saldo-Rekening")

                const currentBalance = await this.engine.getInnerHTML("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]");
                return parseInt(currentBalance);
            }
            throw new Error("User is not logged in")
        } catch {
            await this.logout()
        }
    }

    async getTransactions(startAt: Date, endAt: Date): Promise<BankTransaction[]> {
        try {
            if (this.loggedIn) {
                await this.engine.click("#REKENING")
                await this.engine.click("#Informasi-Saldo--Mutasi_Saldo-Rekening")
                await this.engine.click("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]")

                const accountNum = await this.engine.getInnerHTML("#HREF_AccountSummaryFG\\.ACCOUNT_NUMBER_ARRAY\\[0\\]");

                await this.engine.click("#TRANSACTION_CATEGORIZATION")
                await this.engine.click("#SearchPanel\\.SubSection2\\.collapsibleImage")
                await this.engine.click('[id=TransactionHistoryFG\\.SELECTED_RADIO_INDEX][value="0"]')

                await this.engine.type('#TransactionHistoryFG\\.FROM_TXN_DATE', moment(startAt).format("DD-MMM-YYYY"));
                await this.engine.type('#TransactionHistoryFG\\.TO_TXN_DATE', moment(endAt).format("DD-MMM-YYYY"));

                await this.engine.click("#SEARCH")
                await this.engine.waitForNavigation()

                let result = []

                const nextButtonExists = await this.engine.checkOnScreen('#Action\\.OpTransactionListing_custom\\.GOTO_NEXT__');
                let nextButtonClickable = true
                while (nextButtonClickable) {
                    const tableDatas = await this.engine.$$eval<string[]>('#txnHistoryList tr.listwhiterow,.listgreyrow', rows => {
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
                        const externalId = hash.md5Hash(data[1] + data[2] + data[4] + data[5])

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

                    result = [...result, ...transactions]

                    if (nextButtonExists) {
                        nextButtonClickable = await this.engine.$eval<boolean>('#Action\\.OpTransactionListing_custom\\.GOTO_NEXT__', el => !el.getAttributeNames().includes("disabled"))
                        if (nextButtonClickable) {
                            await this.engine.click('#Action\\.OpTransactionListing_custom\\.GOTO_NEXT__')
                            await this.engine.waitForNavigation()
                        }
                    } else {
                        nextButtonClickable = false;
                    }
                }

                return result
            }
            throw new Error("User is not logged in")
        } catch {
            await this.logout()
        }
    }

    async logout() {
        await this.engine.click("#HREF_Logout")
        await this.engine.click("#LOG_OUT")
        await this.engine.waitForNavigation()
        await this.engine.shutdown()
    }
}
