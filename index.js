const express = require('express');
const path = require('path');
const app = express();

const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server)

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));        // Serve the static files from the public directory

io.on('connection', (socket) => { 
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    })
    
    socket.on('disconnect', () => {
        io.emit("user-disconnected",  socket.id);
    })
})

app.get("/", (req, res) => {
    
    res.render("index.ejs")
})

server.listen(3000, (req, res) => { 
    console.log('Server is running on port 3000');  // Log the server running message
})