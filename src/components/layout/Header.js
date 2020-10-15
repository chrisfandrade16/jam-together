import React from "react";
import { getTotalStyle, getLinkStyle } from "../../styles/layout/header.js";

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        
        this.getTotalStyle = getTotalStyle.bind(this);
        this.getLinkStyle = getLinkStyle.bind(this);
    }

    render() {
        return(
            <div style={this.getTotalStyle}>
                <a href="/lobbies" style={this.getLinkStyle}>

                </a>

                <a href="/profile" style={this.getLinkStyle}>
                    
                </a>
            </div>
        );
    }
};
