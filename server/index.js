const http = require("http");
const express = require("express");
const socketio = require('socket.io');

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "https://hippopotamus-client.vercel.app",
        methods: ["GET", "POST"]
    }
});

const { addUser, removeUser, getUser, getUsersInChannel } = require("./users");

app.use(router);

io.on("connection", socket => {
    socket.on("join", ({ name, channel }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, channel });

        if(error) return callback(error);

        // user object comes from addUser
        socket.join(user.channel);

        // This message is visible for the user
        socket.emit("message", { user: "admin", text: `${user.name}, welcome to #${user.channel}.`} );
        
        // An this for all the users in the same channel
        socket.broadcast.to(user.channel).emit("message", { user: "admin", text: `${user.name} has joined!`} );
    
        io.to(user.channel).emit("channelData", { users: getUsersInChannel(user.channel) } );
    });



    socket.on("sendMessage", (message, callback) => {
        // getUser returns user (which is a object)
        const user = getUser(socket.id);

        io.to(user.channel).emit("message", { user: user.name, text: message } );

        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.channel).emit("message", { user: "admin", text: `${user.name} has left.` } );
            io.to(user.channel).emit("channelData", { users: getUsersInChannel(user.channel) } );
        }
    });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));