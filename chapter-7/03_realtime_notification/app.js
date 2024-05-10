const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.get('/notification/:id', (req, res) => {
    let userID = req.params.id;

    const db = require('./db.json');
    let notifications = db.notifications.filter(n => {
        return n.user_id == userID;
    });

    res.render('notification', { userID, notifications });
});

app.post('/notification', (req, res) => {
    let { user_id, title, body } = req.body;

    let db = require('./db.json');
    let newNotification = {
        id: db.next_id++,
        user_id, title, body
    };

    // push kedalam database
    db.notifications.push(newNotification);

    // kirimkan notifikasi baru
    io.emit(`user-${user_id}`, newNotification);

    fs.writeFileSync('./db.json', JSON.stringify(db, null, 4));
    return res.status(201).json({
        status: true,
        message: 'OK',
        data: newNotification
    });
});

// socket.io (server)
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});