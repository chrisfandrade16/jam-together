import React from "react";
import Header from './Header';
import Footer from "./Footer";
import { getTotalStyle, getPropsStyle } from "../../styles/layout/layout.js";

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        
        this.getTotalStyle = getTotalStyle.bind(this);
        this.getPropsStyle = getPropsStyle.bind(this);
    }

    render() {
        return(
            <div style={this.getTotalStyle}>
                <Header></Header>

                <div style={this.getPropsStyle}>
                    {this.props.children}
                </div>

                <Footer></Footer>
            </div>
        );
    }
};
