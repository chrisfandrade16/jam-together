import React from "react";
import { getFromStorage } from "../../utilities/authentication/storage.js";
import { onInputChangeSignInIdentifier, onInputChangeSignInPassword, onInputChangeSignUpEmail, onInputChangeSignUpUsername, onInputChangeSignUpPassword } from "../../handlers/authentication/input.js";
import { onButtonClickSignIn, onButtonClickSignUp, onButtonClickSignOut } from "../../handlers/authentication/button.js";

export default class Authentication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            token: "",
            message: "",
            signInIdentifier: "",
            signInPassword: "",
            signUpEmail: "",
            signUpUsername: "",
            signUpPassword: ""
        };
        
        this.onInputChangeSignInIdentifier = onInputChangeSignInIdentifier.bind(this);
        this.onInputChangeSignInPassword = onInputChangeSignInPassword.bind(this);
        this.onInputChangeSignUpEmail = onInputChangeSignUpEmail.bind(this);
        this.onInputChangeSignUpUsername = onInputChangeSignUpUsername.bind(this);
        this.onInputChangeSignUpPassword = onInputChangeSignUpPassword.bind(this);
        this.onButtonClickSignIn = onButtonClickSignIn.bind(this);
        this.onButtonClickSignUp = onButtonClickSignUp.bind(this);
        this.onButtonClickSignOut = onButtonClickSignOut.bind(this);
    }

    async componentDidMount() {
        this.setState({
            isLoading: true
        });
    
        const object = await getFromStorage("jam-together");
    
        if(object && object.token) {
            const { token } = object;
            const result = await fetch("http://localhost:5000/api/verify/?token=" + token);
            const json = await result.json();

            console.log(json);
            console.log(token);
    
            if(json.success) {
                this.setState({
                    isLoading: false,
                    token: token
                });
            }
            else {
                this.setState({
                    isLoading: false
                });
            }
        }
        else {
            this.setState({ 
                isLoading: false
            });
        }
    }

    render() {
        const { isLoading, token, message, signInIdentifier, signInPassword, signUpEmail, signUpUsername, signUpPassword } = this.state;

        if(isLoading) {
            return(
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        if(!token) {
            return(
                <div>
                    {   
                        (message) ? (<p>{message}</p>) : (null)
                    }
                    <p>Sign In</p>
                    <br></br>
                    <input type="text" placeholder="Email or Username" value={signInIdentifier} onChange={this.onInputChangeSignInIdentifier}></input>
                    <br></br>
                    <input type="password" placeholder="Password" value={signInPassword} onChange={this.onInputChangeSignInPassword}></input>
                    <br></br>
                    <button onClick={this.onButtonClickSignIn}>Sign In</button>
                    <br></br>
                    <br></br>
                    <p>Sign Up</p>
                    <br></br>
                    <input type="email" placeholder="Email" value={signUpEmail} onChange={this.onInputChangeSignUpEmail}></input>
                    <br></br>
                    <input type="text" placeholder="Username" value={signUpUsername} onChange={this.onInputChangeSignUpUsername}></input>
                    <br></br>
                    <input type="password" placeholder="Password" value={signUpPassword} onChange={this.onInputChangeSignUpPassword}></input>
                    <br></br>
                    <button onClick={this.onButtonClickSignUp}>Sign Up</button>
                </div>
            );
        }

        return(
            <div>
                <p>Account</p>
                <button onClick={this.onButtonClickSignOut}>Sign Out</button>
            </div>
        );
    }
};
