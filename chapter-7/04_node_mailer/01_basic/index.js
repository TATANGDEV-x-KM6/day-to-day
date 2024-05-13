let nodemailer = require('nodemailer');
let { google } = require('googleapis');

let clientId = '';
let clientSecret = '';
let refreshToken = '';

let oauth2Client = new google.auth.OAuth2(
    clientId, clientSecret
);
oauth2Client.setCredentials({ refresh_token: refreshToken });

async function sendEmail() {
    try {
        let accessToken = await oauth2Client.getAccessToken();
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'romadhonatatang@gmail.com',
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
                accessToken: accessToken
            }
        });

        transport.sendMail({
            to: 'tromadhona@binaracademy.org',
            subject: 'Test Send Email',
            // text: 'haloo',
            html: `<h1 style="color:red;">Ini Judul</h1>
            <p><b>tebal</b> tipis</p>`
        });
    } catch (error) {
        console.log(err);
    }
}

sendEmail();
