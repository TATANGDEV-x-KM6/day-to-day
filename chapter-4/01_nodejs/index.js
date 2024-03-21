// core module
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function inputNumber(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(Number(answer));
        });
    });
}
async function main() {
    let num1 = await inputNumber(`What's your first number?`);
    let num2 = await inputNumber(`What's your second number?`);

    console.log(`${num1} + ${num2} = ${num1 + num2}`);
    rl.close();
}
main();

// third party module

// local module