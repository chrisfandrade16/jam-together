const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
    userID: {
        type: String,
        defualt: ""
    },
    email: {
        type: String,
        default: "" 
    },
    username: {
        type: String,
        default: "" 
    },
    password: {
        type: String,
        default: "" 
    },
    time: {
        type: Date,
        default: Date.now() 
    }
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", User);
