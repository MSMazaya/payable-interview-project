import BaseEngine from "../engine/base-engine";
import BankTransaction from "../types/bank-transaction";

export default abstract class BaseBankScraper {
    engine: BaseEngine;

    abstract login(): void
    abstract getCurrentBalance(): Promise<number>
    abstract getTransactions(startAt: Date, endAt: Date): Promise<BankTransaction[]>
    abstract logout(): void
}
