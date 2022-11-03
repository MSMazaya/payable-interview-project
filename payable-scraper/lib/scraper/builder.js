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
const puppeteer_engine_1 = __importDefault(require("../engine/puppeteer-engine"));
const bni_scraper_1 = __importDefault(require("./bni-scraper"));
class ScraperBuilder {
    constructor() {
        this.build = this.build.bind(this);
    }
    pickScraper(bankCode) {
        this.bankCode = bankCode;
        return this;
    }
    pickEngine(engine) {
        this.engine = engine;
        return this;
    }
    setCreds(credentials) {
        this.credentials = credentials;
        return this;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            let engine;
            switch (this.engine) {
                case "puppeteer":
                    engine = new puppeteer_engine_1.default();
                    yield engine.init();
                    break;
                default:
                    throw new Error("Engine not found");
            }
            switch (this.bankCode) {
                case "BNI":
                    return new bni_scraper_1.default(this.credentials.accountId, this.credentials.password, engine);
                default:
                    throw new Error("Unsupported bank code");
            }
        });
    }
}
exports.default = ScraperBuilder;
//# sourceMappingURL=builder.js.map