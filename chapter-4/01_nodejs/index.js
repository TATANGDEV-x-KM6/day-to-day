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
const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'localhost',
    database: 'youtube',
    user: 'tatangdev',
    password: null,
    port: 5432,
});

async function main() {
    let perPage = 5;
    let page = 3;
    let users = await pool.query('SELECT * FROM videos LIMIT $1 OFFSET $2', [perPage, (page - 1) * perPage]);
    console.log(users.rows);
}
main();

// local module