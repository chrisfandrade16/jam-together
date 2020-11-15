import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../layout/Layout";
import { getFromStorage } from "../../utilities/storage.js";
import { onButtonClickCreateRoom, onButtonClickSignOut } from "../../utilities/lobbies/button.js";
import loading_gif from '../../images/loading.gif';
import "../../styles/lobbies/lobbies.css";

export default class Lobbies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user_id: "",
            room_id: "",
            message: "",
            signOut: false
        };

        this.onButtonClickCreateRoom = onButtonClickCreateRoom.bind(this);
        this.onButtonClickSignOut = onButtonClickSignOut.bind(this);
    }

    async componentDidMount() {
        this.setState({
            isLoading: true,
        });
    
        const object = await getFromStorage("jam-together");
    
        if(object && object.token) {
            const { token } = object;
            const result = await fetch("/api/verify/?token=" + token);
            const json = await result.json();
    
            if(json.success) {
                this.setState({
                    isLoading: false,
                    user_id: token
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
        if(lobbies) {
            for(let index = 0; index < rooms.length; index++) {
                let lobby = document.createElement("li");
                lobby.textContent = rooms[index].creatorID;
                lobby.style.background = '#E3163D';
                lobbies.appendChild(lobby);
            }
        }
    }

    render() {
        const {isLoading, signOut } = this.state;
        
        if(isLoading) {
            return(
                <Layout>
                    <div className="wallpaper">
                        <img className="loading" src={loading_gif} alt="Loading Gif"></img>
                    </div>
                </Layout>
            );
        }

        if(!signOut)
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

        return(
            <Redirect to="/"></Redirect>
        );
    }
};
