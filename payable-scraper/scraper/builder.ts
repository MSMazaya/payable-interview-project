import BaseEngine from "../engine/base-engine";
import PuppeteerEngine from "../engine/puppeteer-engine";
import BniBankScraper from "./bni-scraper";

export default class ScraperBuilder {
    credentials: { accountId: string, password: string };
    bankCode: string;
    engine: string;

    constructor() {
        this.build = this.build.bind(this)
    }

    pickScraper(bankCode: "BNI" | "BCA" | "BRI") {
        this.bankCode = bankCode;
        return this;
    }

    pickEngine(engine: "puppeteer") {
        this.engine = engine;
        return this;
    }

    setCreds(credentials: { accountId: string, password: string }) {
        this.credentials = credentials;
        return this;
    }

    async build() {
        let engine: BaseEngine;
        switch (this.engine) {
            case "puppeteer":
                engine = new PuppeteerEngine();
                await engine.init();
                break;
            default:
                throw new Error("Engine not found");
        }
        switch (this.bankCode) {
            case "BNI":
                return new BniBankScraper(this.credentials.accountId, this.credentials.password, engine);
            default:
                throw new Error("Unsupported bank code");
        }
    }
}
