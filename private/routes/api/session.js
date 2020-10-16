const express = require("express");
const User = require("../../models/api/User.js");
const Session = require("../../models/api/Session.js");

const sessionRouter = express.Router();

sessionRouter.post("/signin", (request, result) => {
    const { body } = request;
    const { username, password } = body;
    let { email } = body;

    if(!password) {
        return result.send({
            success: false,
            message: "Error: Password entry cannot be blank."
        });
    }

    if(username) {
        User.find({ username: username }, (error, users) => {
            if(error) {
                return result.send({
                    success: false,
                    message: "Error: Internal server error."
                });
            }
            else if(!users.length) {
                return result.send({
                    success: false,
                    message: "Error: User does not exist."
                });
            }
    
            const user = users[0];
    
            if(!user.validPassword(password)) {
                return result.send({
                    success: false,
                    message: "Error: Incorrect password."
                });
            }
    
            const session = new Session();
    
            session.save((error) => {
                if(error) {
                    return result.send({
                        success: false,
                        message: "Error: Internal server error."
                    });
                }
    
                return result.send({
                    success: true,
                    message: "Sign in successful.",
                    token: session._id
                });
            });
        });
    }
    else if(email) {
        email = email.toLowerCase();

        User.find({ email: email }, (error, users) => {
            if(error) {
                return result.send({
                    success: false,
                    message: "Error: Internal server error."
                });
            }
            else if(!users.length) {
                return result.send({
                    success: false,
                    message: "Error: User does not exist."
                });
            }
    
            const user = users[0];
    
            if(!user.validPassword(password)) {
                return result.send({
                    success: false,
                    message: "Error: Incorrect password."
                });
            }
    
            const session = new Session();
    
            session.save((error) => {
                if(error) {
                    return result.send({
                        success: false,
                        message: "Error: Internal server error."
                    });
                }
    
                return result.send({
                    success: true,
                    message: "Sign in successful.",
                    token: session._id
                });
            });
        });
    }
    else {
        return result.send({
            success: false,
            message: "Error: Email or username entry cannot be blank."
        });
    }
});

sessionRouter.get("/verify", (request, result) => {
    const token = request.query.token;

    Session.find({ _id: token }, (error, sessions) => {
        if(error) {
            return result.send({
                success: false,
                message: "Error: Internal server error."
            });
        }

        if(!sessions.length) {
            return result.send({
                success: false,
                message: "Error: Session does not exist."
            });
        }
        else
        {
            return result.send({
                success: true,
                message: "Error: Session verified."
            });
        }
    });
});

sessionRouter.delete("/signout", (request, result) => {
    const { body } = request;
    const { token } = body;

    Session.deleteOne({ _id: token }, (error) => {
        if(error) {
            return result.send({
                success: false,
                message: "Error: Internal server error."
            });
        }

        return result.send({
            success: true,
            message: "Sign out successful."
        });
    });
});

module.exports = sessionRouter;
