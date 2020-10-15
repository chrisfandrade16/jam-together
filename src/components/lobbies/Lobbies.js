import React from "react";
import Layout from "../layout/Layout";
import { getTotalStyle } from "../../styles/lobbies/lobbies.js";

export default class Lobbies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        
        this.getTotalStyle = getTotalStyle.bind(this);
    }

    render() {
        return(
            <div>
                <Layout>
                    <div style={this.getTotalStyle}>
                        
                    </div>
                </Layout>
            </div>
        );
    }
};
