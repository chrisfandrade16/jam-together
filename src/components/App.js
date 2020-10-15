import React from "react";
import { Router } from '@reach/router';
import Authentication from "./authentication/Authentication";
import Lobbies from "./lobbies/Lobbies";
import Profile from "./profile/Profile";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <div className="App">
                <Router>
                    <Authentication path="/"></Authentication>

                    <Lobbies path ="/lobbies"></Lobbies>

                    <Profile path ="/profile"></Profile>
                </Router>
            </div>
        );
    }
};
