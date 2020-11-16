const mongoose = require("mongoose");

const Session = new mongoose.Schema({
    userID: {
        type: String,
        default: ""
    },
    time: {
        type: Date,
        default: Date.now() 
    }
});

module.exports = mongoose.model("Session", Session);
