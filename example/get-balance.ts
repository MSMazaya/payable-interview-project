import scraper from 'payable-scraper';
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
    ];

    return inquirer.prompt(questions);
}

async function main() {
    const credentials = await getCredentials();
    const { accountId, password } = credentials;

    const bniScraper = await scraper().pickEngine('puppeteer').pickScraper("BNI").setCreds({ accountId, password }).build();
    await bniScraper.login()

    const balance = await bniScraper.getCurrentBalance()

    console.log("You have Rp" + balance + " balance in your account")
    await bniScraper.logout()
}

main()
