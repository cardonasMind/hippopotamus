const http = require("http");
const express = require("express");
const socketio = require('socket.io');
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "http://localhost:3000", credentials: true } } );

app.use(cors());
app.use(router);

io.on("connection", socket => {
    socket.on("join", ({ name, channel }) => {
        console.log(name, channel);
    });

    socket.on("disconnect", () => {
        console.log("Human left!");
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));