import BaseEngine from "./base-engine";
import puppeteer from 'puppeteer';

export default class PuppeteerEngine implements BaseEngine {
    page: puppeteer.Page;
    browser: puppeteer.Browser;

    async init() {
        this.browser = await puppeteer.launch({
            headless: process.env.DEBUG ? false : true,
        });
        this.page = await this.browser.newPage();
    }
    async click(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector)
    }
    async type(selector: string, text: string) {
        await this.page.type(selector, text)
    }
    async goto(url: string) {
        await this.page.goto(url)
    }
    async reload() {
        await this.page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    }
    async getScreenshot(selector: string) {
        const element = await this.page.$(selector);
        const elementScreenshot = await element.screenshot();
        return elementScreenshot
    }
    async waitForNavigation() {
        await this.page.waitForNavigation();
    }
    async getInnerHTML(selector: string) {
        await this.page.waitForSelector(selector);
        const innerHTML = await this.page.$eval(selector, el => el.innerHTML)
        return innerHTML
    }
    async checkOnScreen(selector: string): Promise<boolean> {
        const exist = await this.page.$(selector);
        return !!exist
    }
    async $eval(selector: string, pageFunction: (element: Element, ...args: any[]) => any, ...args: any[]) {
        const result = await this.page.$eval(selector, pageFunction, ...args);
        return result
    }
    async $$eval(selector: string, pageFunction: (element: Element[], ...args: any[]) => any, ...args: any[]) {
        const result = await this.page.$$eval(selector, pageFunction, ...args);
        return result
    }
    async shutdown(): Promise<void> {
        await this.browser.close();
    }
}
