const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

const v1Router = require('./routes/v1/index.js');
app.use('/v1', v1Router);

app.listen(port, () => {
    console.log('running on port', port);
});