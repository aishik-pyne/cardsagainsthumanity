#!/user/bin/env node
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

/**
 * Module dependencies.
 */

import http from "http";
// import app from "./app";
import { Server } from "socket.io";

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

/**
 * Get port from environment and store in Express.
 */

export const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer();
// const server = http.createServer(app);

/**
 * Socket IO Implementation
 */
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        // methods: ["GET", "POST"],
        // transports: ["websocket", "polling"],
    },
    allowEIO3: true,
});
import { createRoom, joinRoom, startGame, getRoom, leaveRoom } from "./service/room.service";
import { createPlayer, setPlayerName, deletePlayer } from "./service/players.service";
import { Room } from "./models/room";
import { Player } from "./models/player";

io.on("connection", function (socket) {
    // console.log(`A user connected with socket id ${socket.id}`);
    let player: Player = createPlayer(socket.handshake.query.name);
    let room: Room = null;
    socket.emit("PLAYER_INFO", player);

    socket.on("PLAYER_INFO_SETNAME", function (name) {
        player = setPlayerName(player.id, name);
        socket.emit("PLAYER_INFO", player);
    });

    socket.on("CREATE_ROOM", function () {
        room = createRoom(player);
        socket.join(`room-${room.id}`);
        socket.emit("CREATED_ROOM", room.id);
        io.to(`room-${room.id}`).emit("ROOM_INFO", getRoom(room.id));
    });

    socket.on("JOIN_ROOM", function (roomId) {
        room = joinRoom(roomId, player);
        socket.join(`room-${room.id}`);
        socket.emit("JOINED_ROOM", room.id);
        io.to(`room-${room.id}`).emit("ROOM_INFO", getRoom(room.id));
    });

    socket.on("LEAVE_ROOM", function () {
        if (room) {
            leaveRoom(room.id, player.id);
            io.to(`room-${room.id}`).emit("ROOM_INFO", getRoom(room.id));
            room = null;
        }
    });

    socket.on("ROOM_INFO", function () {
        if (room != null) {
            socket.emit("ROOM_INFO", getRoom(room.id));
        } else {
            socket.emit("ROOM_INFO", null);
        }
    });

    socket.on("START_GAME", function () {
        startGame(room.id);
        io.to(`room-${room.id}`).emit("ROOM_INFO", getRoom(room.id));
    });

    socket.on("disconnect", function () {
        if (room) {
            leaveRoom(room.id, player.id);
            io.to(`room-${room.id}`).emit("ROOM_INFO", getRoom(room.id));
            room = null;
        }
        deletePlayer(player.id);
    });
});

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
};

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
