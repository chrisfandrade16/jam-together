import React, { Component } from "react";
import Header from './Header';
import Footer from "./Footer";
import "../../styles/layout/layout.css";

export default class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return(
            <div>
                <Header lobbies={this.props.lobbies} profile={this.props.profile}></Header>

                <div className="props">
                    {this.props.children}
                </div>

                <Footer></Footer>
            </div>
        );
    }
};
