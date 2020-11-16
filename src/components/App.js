import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Authentication from "./authentication/Authentication";
import Lobbies from "./lobbies/Lobbies";
import Profile from "./profile/Profile";
import { setIsLoading, setUserID } from "../utilities/state.js"

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            userID: ""
        };

        this.setIsLoading = setIsLoading.bind(this);
        this.setUserID = setUserID.bind(this);
    }

    render() {
        const { isLoading, userID } = this.state;

        return(
            <div className="App">
                <BrowserRouter>
                    <Route path="/" render={(props) => <Authentication {...props} setIsLoading={this.setIsLoading} setUserID={this.setUserID} getIsLoading={isLoading} getUserID={userID}></Authentication>}></Route>
                    <Route path="/lobbies" render={(props) => <Lobbies {...props} setIsLoading={this.setIsLoading} setUserID={this.setUserID} getIsLoading={isLoading} getUserID={userID}></Lobbies>}></Route>
                    <Route path="/profile" render={(props) => <Profile {...props} setIsLoading={this.setIsLoading} setUserID={this.setUserID} getIsLoading={isLoading} getUserID={userID}></Profile>}></Route>
                </BrowserRouter>
            </div>
        );
    }
};
