const express = require("express");
const User = require("../../models/api/User.js");
const Session = require("../../models/api/Session.js");
const Room = require("../../models/room/Room.js");

const roomRouter = express.Router();

roomRouter.post("/create", (request, result) => {
    const { body } = request;
    const { userID } = body;

    const room = new Room();
    room.creatorID = userID;

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
            roomID: room._id.valueOf()
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
