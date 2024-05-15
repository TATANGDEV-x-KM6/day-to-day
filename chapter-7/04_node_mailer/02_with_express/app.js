require('dotenv').config();
const express = require('express');
const app = express();
const { getHTML, sendMail } = require('./libs/nodemailer');

app.set('view engine', 'ejs');

app.get('/send-email', async (req, res, next) => {
    try {
        let to = 'tromadhona@binaracademy.org';
        let html = await getHTML('verification-code.ejs', { name: 'Joko', verification_code: 4035 });
        // sendMail(to, 'Verification Code', `<h1>test</h1>`);
        sendMail(to, 'Verification Code', html);
        res.json({ status: true });
    } catch (error) {
        next(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening on port:', PORT));