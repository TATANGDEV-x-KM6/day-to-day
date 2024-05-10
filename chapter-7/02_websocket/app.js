const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.get('/chat', (req, res) => {
    res.render('chat.ejs');
});

app.get('/chat/:id', (req, res) => {
    res.render('chat.ejs', { id: Number(req.params.id) });
});

// socket.io (server)
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    // subscribe topic chat
    socket.on('chat message', (msg) => {
        console.log('server receive:', msg);
        io.emit('chat message', msg); // mengirimkan chat ke semua user yang terhubung
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});