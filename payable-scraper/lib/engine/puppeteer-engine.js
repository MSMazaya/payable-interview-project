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
const puppeteer_1 = __importDefault(require("puppeteer"));
class PuppeteerEngine {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer_1.default.launch({
                headless: process.env.DEBUG ? false : true,
            });
            this.page = yield this.browser.newPage();
        });
    }
    click(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForSelector(selector);
            yield this.page.click(selector);
        });
    }
    type(selector, text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.type(selector, text);
        });
    }
    goto(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto(url);
        });
    }
    reload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        });
    }
    getScreenshot(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.page.$(selector);
            const elementScreenshot = yield element.screenshot();
            return elementScreenshot;
        });
    }
    waitForNavigation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForNavigation();
        });
    }
    getInnerHTML(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForSelector(selector);
            const innerHTML = yield this.page.$eval(selector, el => el.innerHTML);
            return innerHTML;
        });
    }
    checkOnScreen(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.page.$(selector);
            return !!exist;
        });
    }
    $eval(selector, pageFunction, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.page.$eval(selector, pageFunction, ...args);
            return result;
        });
    }
    $$eval(selector, pageFunction, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.page.$$eval(selector, pageFunction, ...args);
            return result;
        });
    }
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.close();
        });
    }
}
exports.default = PuppeteerEngine;
//# sourceMappingURL=puppeteer-engine.js.map