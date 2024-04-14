#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//initialize user balance and pin code
let myBalance = 10000;
let myPin = 5151;

//print welcome message
console.log(chalk.blue ("\n \tWELCOME TO ATM MACHINE\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellowBright ("Enter your pin code"),
        type: "number"
    }
])
if(pinAnswer.pin === myPin){
    console.log(chalk.green("\nPin is correct, login successfully!\n"));
    //console.log(`current account is ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message:chalk.yellowBright ("select an operation:"),
            choices:["withdraw amount", "check balance"]
        }
    ])
    //if user use withdraw
      if(operationAns.operation === "withdraw amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawalMethod",
                type: "list",
                message:chalk.yellowBright ("select a withdrawal method"),
                choices: ["fast cash", "enter amount"]
            }
        ])
        if(withdrawAns.withdrawalMethod === "fast cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.yellowBright ("Select Amount"),
                    choices: ["1000", "3000", "10000", "15000" ]
                }
            ])
            if(fastCashAns.fastCash > myBalance){
                console.log(chalk.red ("\nSorry, Your Balance Is insufficient\n")); 
            }
            else {
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
                console.log(chalk.green(`Your Remaining Balance is: ${myBalance}`));
            }

        }
        else if(withdrawAns.withdrawalMethod === "enter amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message:chalk.yellowBright ("Enter your amount to withdraw:")
                }
            ])
            if(amountAns.amount > myBalance){
                console.log(chalk.red ("\nSorry, Your Balance Is insufficient\n"));
            }
            else{
                 myBalance -= amountAns.amount;
                 console.log(`${amountAns.amount} Withdraw Successfully`);
                 console.log(chalk.green(`Your Remaining Balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "check balance"){
        console.log(chalk.green (`your account balance is: ${myBalance}`));
    }
}     
else{
    console.log(chalk.red("Sorry, Your pin is incorrect. Please try again!"));
}
