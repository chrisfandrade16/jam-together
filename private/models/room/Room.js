const mongoose = require("mongoose");

const Room = new mongoose.Schema({
    creatorID: {
        type: String,
        default: "" 
    },
    users: [{
        type: String,
        default: ""
    }]
});

module.exports = mongoose.model("Room", Room);