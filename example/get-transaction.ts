import scraper from 'payable-scraper';
import moment from 'moment';
import inquirer from 'inquirer';

function getCredentials() {
    const questions = [
        {
            name: 'accountId',
            type: 'input',
            message: 'Enter your bank account id:',
            validate: function(value: string) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username or e-mail address.';
                }
            }
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your password:',
            validate: function(value: string) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your password.';
                }
            }
        },
        {
            name: 'dateStart',
            type: 'input',
            message: 'Enter date start (DD-MM-YYYY):',
            validate: function(value: string) {
                if (value.length) {
                    return true;
                } else {
                    return 'please enter a date start';
                }
            }
        },
        {
            name: 'dateEnd',
            type: 'input',
            message: 'Enter date end (DD-MM-YYYY):',
            validate: function(value: string) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter a date end';
                }
            }
        },
    ];

    return inquirer.prompt(questions);
}

async function main() {
    const creds = await getCredentials();

    const { accountId, password, dateStart, dateEnd } = creds;

    const bniScraper = await scraper().pickEngine('puppeteer').pickScraper("BNI").setCreds({ accountId, password }).build();
    await bniScraper.login()

    const previousDate = moment(dateStart, 'DD-MM-YYYY').toDate();
    const currentDate = moment(dateEnd, 'DD-MM-YYYY').toDate();

    const transactions = await bniScraper.getTransactions(previousDate, currentDate)

    console.table(transactions)
    await bniScraper.logout()
}

main()
