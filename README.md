# Payable Scraper Interview Project

Creating a `payable-scraper` node package that wrap an implementation of a particular bank web crawling. 

## Project Structure
```
.
├── example
│   ...
└── payable-scraper
    ...
```
This project consists of two main folders: [example](https://github.com/MSMazaya/payable-interview-project/tree/main/example) and [payable-scraper](https://github.com/MSMazaya/payable-interview-project/tree/main/payable-scraper). Both of them is a node/npm package. The implementation of requested web crawler design is available at the payable-scraper folder. While the example is just a simple script that uses payable-scraper package to ease the demo of this project.

## Project Setup & Testing
To test the program, you can navigate to the [example](https://github.com/MSMazaya/payable-interview-project/tree/main/example) directory. After doing so, install the dependencies of this project by typing the following.

```bash
npm install
```

or if you are using yarn

```bash
yarn install
```

After installing the dependencies, you can choose to test 2 functionality of the web crawler: getting transactions and getting balance. 

1. Getting transactions

    To run this program, all you need to do is to run the following command.

    ```
    npm run get-transaction
    ```
    > Note: if you want to see the browser while the web crawler do its job you can use `DEBUG=1 npm run get-transaction` instead.

    This will then prompt you to fill in two credentials (account id and password) followed by date range selection with format DD-MMM-YYYY (e.g. 20-Oct-2022). If the program is successful, it will be printing a table of your transactions. Do note that the range could not be more than 30 days or else the program will fail to get the transactions information.

2. Getting balance
    To run this program, all you need to do is to run the following command.

    ```
    npm run get-balance
    ```
    This will then prompt you to fill in two credentials (account id and password) followed by date range selection with format DD-MM-YYYY (e.g. 20-08-2022). If the program is successful, it will print your current balance.
