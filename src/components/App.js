import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Authentication from "./authentication/Authentication";
import Lobbies from "./lobbies/Lobbies";
import Profile from "./profile/Profile";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <div className="App">
                <BrowserRouter>
                    <Route path="/" component={Authentication}></Route>
                    <Route path="/lobbies" component={Lobbies}></Route>
                    <Route path="/profile" component={Profile}></Route>
                </BrowserRouter>
            </div>
        );
    }
};
