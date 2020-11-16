const mongoose = require("mongoose");

const Room = new mongoose.Schema({
    roomID: {
        type: String,
        default: "" 
    },
    userID: {
        type: String,
        default: "" 
    },
    membersID: [{
        type: String,
        default: ""
    }]
});

module.exports = mongoose.model("Room", Room);