const mongoose = require("mongoose");
const express = require("express");
const socket = require("socket.io");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/api/user.js");
const sessionRouter = require("./routes/api/session.js");
const roomRouter = require("./routes/room/room.js");

let database;
try {
    database = require("../configuration/keys.js");
}
catch(error) {

}

const server = express();
const io = socket();
const port = process.env.PORT || 5000;
const key = process.env.DATABASE_KEY || database.mongoURI;

mongoose.connect(key, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Database connected...")).catch((err) => console.log(err));

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true}));
server.use("/api", userRouter);
server.use("/api", sessionRouter);
server.use("/room", roomRouter);
server.use(express.static(path.join(__dirname, "../build")));
server.get("*", (request, result) => { 
    result.sendFile(path.join(__dirname + "../build/index.html"));
});
server.listen(port, () => console.log(`server now running on port ${port}...`));

io.on("connection", (socket) => {
    socket.on("join-room", (room_id, user_id) => {
        console.log(room_id, user_id);
    })
})