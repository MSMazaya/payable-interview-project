export default interface BankTransaction {
    bankCode: string;
    accountNum: string;
    transactionDate: Date;
    transactionType: "CR" | "DB"; // credit or debit
    transactionAmount: number;
    transactionName: string;
    externalId: string;
}
