const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/products', function (req, res) {
    res.json(["Apple", "Samsung", "One Plus"]);
});

// query
app.get('/orders', function (req, res) {
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

app.listen(port, function () {
    console.log('app listening on port', port);
});