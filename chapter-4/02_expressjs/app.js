const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// application level middleware
app.use(express.json()); // built-in middleware
app.use(morgan('dev')); // third-party middleware

app.get('/', function (req, res, next) {
    try {
        iniError; // test error handler
        res.send('hello world');
    } catch (error) {
        next(error);
    }
});

app.get('/products', async function (req, res, next) {
    try {
        // let products = await Pool.query('SELECT * FROM products');
        // let products = await Pool.query('INSERT INTO users * FROM products');

        res.json(products.rows);
    } catch (err) {
        next(err);
    }
});

// query
const date = function (req, res, next) {
    console.log(Date.now());
    next();
};
app.get('/orders', date, function (req, res) { // route level middleware
    let paid = req.query.paid;
    let orders = [
        { id: 1, paid: true, user_id: 1 },
        { id: 2, paid: false, user_id: 2 },
        { id: 3, paid: true, user_id: 3 }
    ];
    if (paid) {
        orders = orders.filter(i => {
            return i.paid == (paid == 'true');
        });
    }
    res.json(orders);
});

// params
app.get('/orders/:id', function (req, res) {
    let id = Number(req.params.id);
    res.json({ id: id, paid: true, user_id: id });
});

app.post('/orders', function (req, res) {
    res.json(req.body);
});

// internal server error
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ err: err.message });
});

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({ err: `are you lost? ${req.method} ${req.url} is not registered!` });
});

app.listen(port, function () {
    console.log('app listening on port', port);
});