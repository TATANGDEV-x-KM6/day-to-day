const express = require('express');
const app = express();
const port = 3000;
const Pool = require('pg').Pool;

const pool = new Pool({
    database: 'cars',
    host: 'localhost',
    user: 'tatangdev',
    port: 5432,
    password: null
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world!');
});

// get all cars
app.get('/cars', async (req, res) => {
    let cars = await pool.query('SELECT * FROM cars');
    res.send(cars.rows);
});

// get car details
app.get('/cars/:id', async (req, res) => {
    let id = req.params.id;
    let cars = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
    res.send(cars.rows);
});

// 
app.post('/cars', async (req, res) => {
    let brand = req.body.brand;
    let type = req.body.type;

    let car = await pool.query('INSERT INTO cars (brand, type) values ($1, $2)', [brand, type]);
    res.json({ data: car.rowCount });
});

app.listen(port, () => {
    console.log('running on port', port);
});