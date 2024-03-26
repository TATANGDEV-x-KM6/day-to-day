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
    res.status(200).json({
        status: true,
        message: 'welcome to cars api',
        data: null
    });
});

// get all cars
app.get('/cars', async (req, res) => {
    let keyword = req.query.keyword;
    let psqlQuery = 'SELECT * FROM cars';

    if (keyword) {
        psqlQuery += ` WHERE brand LIKE '%${keyword}%' OR type LIKE '%${keyword}%'`;
    }
    // SELECT * FROM cars WHERE brand LIKE '%br%' OR type LIKE '%br%';

    let cars = await pool.query(psqlQuery);

    res.status(200).json({
        status: true,
        message: null,
        data: cars.rows
    });
});

// get car details
app.get('/cars/:id', async (req, res) => {
    let id = req.params.id;
    let cars = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);

    if (cars.rows.length == 0) {
        return res.status(404).json({
            status: false,
            message: `can't find cars with id ${id}`,
            data: null
        });
    }

    res.status(200).json({
        status: true,
        message: null,
        data: cars.rows[0]
    });
});

// create new car
app.post('/cars', async (req, res) => {
    let brand = req.body.brand;
    let type = req.body.type;

    if (!brand || !type) {
        return res.status(400).json({
            status: false,
            message: `brand and type are required`,
            data: null
        });
    }

    let car = await pool.query('INSERT INTO cars (brand, type) values ($1, $2)', [brand, type]);

    res.status(201).json({
        status: true,
        message: null,
        data: car.rowCount
    });
});

// update cars detail
app.put('/cars/:id', async (req, res) => {
    let id = req.params.id;
    let brand = req.body.brand;
    let type = req.body.type;

    let result = await pool.query('UPDATE cars SET brand=$1, type=$2 WHERE id=$3', [brand, type, id]);

    res.status(200).json({
        status: true,
        message: null,
        data: result.rowCount
    });
});

// delete cars
app.delete('/cars/:id', async (req, res) => {
    let id = req.params.id;

    let result = await pool.query('DELETE FROM cars WHERE id=$1', [id]);

    res.status(200).json({
        status: true,
        message: null,
        data: result.rowCount
    });
});

app.delete('/cars-delete', async (req, res) => {
    let ids = req.body.ids;

    let idsStr = '';
    ids.forEach((id, idx) => {
        if (idx == 0) {
            idsStr += id;
        } else {
            idsStr += `,${id}`;
        }
    });

    let result = await pool.query(`DELETE FROM cars WHERE id IN (${idsStr})`,);

    res.status(200).json({
        status: true,
        message: null,
        data: result.rowCount
    });
});

app.listen(port, () => {
    console.log('running on port', port);
});