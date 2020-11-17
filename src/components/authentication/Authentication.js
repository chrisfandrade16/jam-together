import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../../utilities/storage.js";
import { onButtonClickSignIn, onButtonClickSignUp } from "../../utilities/authentication/button.js";
import { onDivClickSignIn, onDivClickSignUp } from "../../utilities/authentication/div.js";
import { onInputChangeSignInIdentifier, onInputChangeSignInPassword, onInputChangeSignUpEmail, onInputChangeSignUpUsername, onInputChangeSignUpPassword, onInputChangeRememberMe } from "../../utilities/authentication/input.js";
import { setMessage } from "../../utilities/authentication/state.js";
import loading_gif from "../../images/loading.gif";
import "../../styles/authentication/authentication.css";

export default class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            signInIdentifier: "",
            signInPassword: "",
            signUpEmail: "",
            signUpUsername: "",
            signUpPassword: "",
            signInOrUp: "IN",
            rememberMe: false
        };

        this.setMessage = setMessage.bind(this);

        this.onButtonClickSignIn = onButtonClickSignIn.bind(this);
        this.onButtonClickSignUp = onButtonClickSignUp.bind(this);

        this.onDivClickSignIn = onDivClickSignIn.bind(this);
        this.onDivClickSignUp = onDivClickSignUp.bind(this);

        this.onInputChangeSignInIdentifier = onInputChangeSignInIdentifier.bind(this);
        this.onInputChangeSignInPassword = onInputChangeSignInPassword.bind(this);
        this.onInputChangeSignUpEmail = onInputChangeSignUpEmail.bind(this);
        this.onInputChangeSignUpUsername = onInputChangeSignUpUsername.bind(this);
        this.onInputChangeSignUpPassword = onInputChangeSignUpPassword.bind(this);
        this.onInputChangeRememberMe = onInputChangeRememberMe.bind(this);
    }

    async componentDidMount() {
        this.props.setIsLoading(true);
    
        const object = await getFromStorage("jam-together");
    
        if(object && object.userID) {
            const { userID } = object;
            const result = await fetch("/api/verify/?userID=" + userID);
            const json = await result.json();
    
            if(json.success) {
                this.props.setIsLoading(false);
                this.props.setUserID(userID);
            }
            else {
                this.props.setIsLoading(false);
            }
        }
        else {
            this.props.setIsLoading(false);
        }
    }

    render() {
        const { message, signInIdentifier, signInPassword, signUpEmail, signUpUsername, signUpPassword, signInOrUp, rememberMe} = this.state;
        const isLoading = this.props.getIsLoading;
        const userID = this.props.getUserID;

        if(isLoading) {
            return(
                <div className="wallpaper">
                    <img className="loading" src={loading_gif} alt="Loading Gif"></img>
                </div>
            );
        }

        if(!userID) {
            if(signInOrUp === "IN") {
                return(
                    <div className="wallpaper">
                        <div className="box">
                            <div className="navigation">
                                <div className="signinup" onClick={this.onDivClickSignIn} style={{ color: "#778899" }}>Sign In</div>
                                <div className="signinup" onClick={this.onDivClickSignUp}>Sign Up</div>
                            </div>
                            <div className="message">{message}</div>
                            <div className="form">
                                <div className="label">Email or Username</div>
                                <input className="input" type="text" value={signInIdentifier} onChange={this.onInputChangeSignInIdentifier}></input>
                                <div className="label">Password</div>
                                <input className="input" type="password" value={signInPassword} onChange={this.onInputChangeSignInPassword}></input>
                                <div className="rememberme">Remember Me</div>
                                <input className="input" type="checkbox" checked={rememberMe} onChange={this.onInputChangeRememberMe}></input>
                            </div>
                            <button className="button" onClick={this.onButtonClickSignIn}>Sign In</button>
                        </div>
                    </div>
                );
            }
            else if(signInOrUp === "UP") {
                return(
                    <div className="wallpaper">
                        <div className="box">
                            <div className="navigation">
                                <div className="signinup" onClick={this.onDivClickSignIn}>Sign In</div>
                                <div className="signinup" onClick={this.onDivClickSignUp} style={{ color: "#778899" }}>Sign Up</div>
                            </div>
                            <div className="message">{message}</div>
                            <div className="form">
                                <div className="label">Email</div>
                                <input className="input" type="text" value={signUpEmail} onChange={this.onInputChangeSignUpEmail}></input>
                                <div className="label">Username</div>
                                <input className="input" type="text" value={signUpUsername} onChange={this.onInputChangeSignUpUsername}></input>
                                <div className="label">Password</div>
                                <input className="input" type="password" value={signUpPassword} onChange={this.onInputChangeSignUpPassword}></input>
                            </div>
                            <button className="button" onClick={this.onButtonClickSignUp}>Sign Up</button>
                        </div>
                    </div>
                );
            }
        }
        
        return(
            <Redirect to={{ pathname: "/lobbies", setMessage: this.setMessage, rememberMe: rememberMe}}></Redirect>
        );
    }
};

