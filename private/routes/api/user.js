const express = require("express");
const User = require("../../models/api/User.js");

const userRouter = express.Router();

userRouter.post("/signup", (request, result) => {
    const { body } = request;
    const { username, password } = body;
    let { email } = body;
    email = email.toLowerCase();

    if(!email) {
        return result.send({
            success: false,
            message: "Error: Email entry cannot be blank."
        });
    }
    if(!username) {
        return result.send({
            success: false,
            message: "Error: Username entry cannot be blank."
        });
    }
    if(!password) {
        return result.send({
            success: false,
            message: "Error: Password entry cannot be blank."
        });
    }

    User.find({ email: email }, (error, users) => {
        if(error) {
            return result.send({
                success: false,
                message: "Error: Internal server error."
            });
        }
        else if(users.length) {
            return result.send({
                success: false,
                message: "Error: User already exists."
            });
        }

        User.find({ username: username }, (error, users) => {
            if(error) {
                return result.send({
                    success: false,
                    message: "Error: Internal server error."
                });
            }
            else if(users.length) {
                return result.send({
                    success: false,
                    message: "Error: User already exists."
                });
            }

            const user = new User();
            user.userID = user._id.valueOf();
            user.email = email;
            user.username = username;
            user.password = user.generateHash(password);

            user.save((error) => {
                if(error) {
                    return result.send({
                        success: false,
                        message: "Error: Internal server error."
                    });
                }

                return result.send({
                    success: true,
                    message: "User signed up."
                });
            });
        });
    });
});

module.exports = userRouter;
