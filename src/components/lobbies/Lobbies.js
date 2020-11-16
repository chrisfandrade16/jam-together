import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../layout/Layout";
import { onButtonClickCreateRoom, onButtonClickSignOut } from "../../utilities/lobbies/button.js";
import loading_gif from '../../images/loading.gif';
import "../../styles/lobbies/lobbies.css";

export default class Lobbies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomID: ""
        };

        this.onButtonClickCreateRoom = onButtonClickCreateRoom.bind(this);
        this.onButtonClickSignOut = onButtonClickSignOut.bind(this);
    }

    async componentDidMount() {
        const result = await fetch("/room/check", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        });
        const json = await result.json();
        const rooms = json.rooms;

        let lobbies = document.getElementById("rooms");
        lobbies.innerHTML = "";
        if(lobbies) {
            for(let index = 0; index < rooms.length; index++) {
                let lobby = document.createElement("li");
                lobby.textContent = rooms[index].roomID;
                lobby.style.background = '#E3163D';
                lobbies.appendChild(lobby);
            }
        }
    }

    async componentDidUpdate() {
        const result = await fetch("/room/check", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        });
        const json = await result.json();
        const rooms = json.rooms;

        let lobbies = document.getElementById("rooms");
        lobbies.innerHTML = "";
        if(lobbies) {
            for(let index = 0; index < rooms.length; index++) {
                let lobby = document.createElement("li");
                lobby.textContent = rooms[index].roomID;
                lobby.style.background = '#E3163D';
                lobbies.appendChild(lobby);
            }
        }
    }

    render() {
        const { isUserSigningOut } = this.state;
        const isLoading = this.props.getIsLoading;
        const userID = this.props.getUserID;
        
        if(isLoading) {
            return(
                <Layout>
                    <div className="wallpaper">
                        <img className="loading" src={loading_gif} alt="Loading Gif"></img>
                    </div>
                </Layout>
            );
        }

        if(!userID)
        {
            return(
                <Redirect to="/"></Redirect>
            );
        }

        if(!isUserSigningOut)
        {
            return(
                <Layout>
                    <div className="wallpaper">
                        <button className="signout" onClick={this.onButtonClickSignOut}>Sign Out</button>
                        <button className = "createroom" onClick={this.onButtonClickCreateRoom}>Create Room</button>
                        <ul id="rooms">

                        </ul>
                    </div>
                </Layout>
            );
        }
    }
};
