"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const base_scraper_1 = __importDefault(require("./base-scraper"));
const captcha_1 = __importDefault(require("../utils/captcha"));
const hash_1 = __importDefault(require("../utils/hash"));
class BniBankScraper extends base_scraper_1.default {
    constructor(accountId, password, engine) {
        super();
        this.accountId = accountId;
        this.password = password;
        this.engine = engine;
        this.maxCaptchaTrial = 20;
        this.loggedIn = false;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.engine.goto('https://ibank.bni.co.id');
                let trial = 0;
                let captchaText = "";
                while (trial < this.maxCaptchaTrial) {
                    const captchaImage = yield this.engine.getScreenshot("#IMAGECAPTCHA");
                    const [failed, text] = yield captcha_1.default.imageToText(captchaImage);
                    if (!failed) {
                        captchaText = text;
                        break;
                    }
                    yield this.engine.reload();
                    trial += 1;
                }
                yield this.engine.type('#AuthenticationFG\\.ACCESS_CODE', this.password);
                yield this.engine.type('#AuthenticationFG\\.USER_PRINCIPAL', this.accountId);
                yield this.engine.type('#AuthenticationFG\\.VERIFICATION_CODE', captchaText);
                this.loggedIn = true;
            }
            catch (e) {
                yield this.logout();
            }
        });
    }
    getCurrentBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.loggedIn) {
                    yield this.engine.click("#REKENING");
                    yield this.engine.click("#Informasi-Saldo--Mutasi_Saldo-Rekening");
                    const currentBalance = yield this.engine.getInnerHTML("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]");
                    return parseInt(currentBalance.replace(/,/g, ""));
                }
                throw new Error("User is not logged in");
            }
            catch (_a) {
                yield this.logout();
            }
        });
    }
    getTransactions(startAt, endAt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.loggedIn) {
                    yield this.engine.click("#REKENING");
                    yield this.engine.click("#Informasi-Saldo--Mutasi_Saldo-Rekening");
                    yield this.engine.click("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]");
                    const accountNum = yield this.engine.getInnerHTML("#HREF_AccountSummaryFG\\.ACCOUNT_NUMBER_ARRAY\\[0\\]");
                    yield this.engine.click("#TRANSACTION_CATEGORIZATION");
                    yield this.engine.click("#SearchPanel\\.SubSection2\\.collapsibleImage");
                    yield this.engine.click('[id=TransactionHistoryFG\\.SELECTED_RADIO_INDEX][value="0"]');
                    yield this.engine.type('#TransactionHistoryFG\\.FROM_TXN_DATE', (0, moment_1.default)(startAt).format("DD-MMM-YYYY"));
                    yield this.engine.type('#TransactionHistoryFG\\.TO_TXN_DATE', (0, moment_1.default)(endAt).format("DD-MMM-YYYY"));
                    yield this.engine.click("#SEARCH");
                    yield this.engine.waitForNavigation();
                    let result = [];
                    const nextButtonExists = yield this.engine.checkOnScreen('#Action\\.OpTransactionListing_custom\\.GOTO_NEXT__');
                    let nextButtonClickable = true;
                    while (nextButtonClickable) {
                        const tableDatas = yield this.engine.$$eval('#txnHistoryList tr.listwhiterow,.listgreyrow', rows => {
                            return Array.from(rows, row => {
                                const rawColumns = row.querySelectorAll('td');
                                return Array.from(rawColumns, column => column.innerText);
                            });
                        });
                        const transactions = tableDatas.map((data) => {
                            const transactionDate = (0, moment_1.default)(data[1], "DD-MMM-YYYY").toDate();
                            const transactionName = data[2];
                            const transactionType = data[4].slice(0, 2).toUpperCase();
                            const transactionAmount = parseFloat(data[5].replace(/,/g, ""));
                            const externalId = hash_1.default.md5Hash(data[1] + data[2] + data[4] + data[5]);
                            return {
                                bankCode: "BNI",
                                accountNum,
                                transactionDate,
                                transactionType,
                                transactionAmount,
                                transactionName,
                                externalId,
                            };
                        });
                        result = [...result, ...transactions];
                        if (nextButtonExists) {
                            nextButtonClickable = yield this.engine.$eval('#Action\\.OpTransactionListing_custom\\.GOTO_NEXT__', el => !el.getAttributeNames().includes("disabled"));
                            if (nextButtonClickable) {
                                yield this.engine.click('#Action\\.OpTransactionListing_custom\\.GOTO_NEXT__');
                                yield this.engine.waitForNavigation();
                            }
                        }
                        else {
                            nextButtonClickable = false;
                        }
                    }
                    return result;
                }
                throw new Error("User is not logged in");
            }
            catch (_a) {
                yield this.logout();
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.engine.click("#HREF_Logout");
            yield this.engine.click("#LOG_OUT");
            yield this.engine.waitForNavigation();
            yield this.engine.shutdown();
        });
    }
}
exports.default = BniBankScraper;
//# sourceMappingURL=bni-scraper.js.map