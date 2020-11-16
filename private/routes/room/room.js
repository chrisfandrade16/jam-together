const express = require("express");
const Room = require("../../models/room/Room.js");

const roomRouter = express.Router();

roomRouter.post("/create", (request, result) => {
    const { body } = request;
    const { userID } = body;

    const room = new Room();
    room.roomID = room._id.valueOf();
    room.userID = userID;

    room.save((error) => {
        if(error) {
            return result.send({
                success: false,
                message: "Error: Internal server error."
            });
        }

        return result.send({
            success: true,
            message: "Room created.",
            roomID: room.roomID
        });
    });
});

roomRouter.get("/check", (request, result) => {
    Room.find({}, (error, rooms) => {
        return result.send({
            rooms: rooms
        })
    });
});

module.exports = roomRouter;
