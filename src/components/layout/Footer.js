import React from "react";
import git_icon from '../../images/git.png';
import linkedin_icon from '../../images/linkedin.png';
import { getTotalStyle, getColumnStyle, getLinkStyle, getTextStyle, getImageStyle } from "../../styles/layout/footer.js";

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        
        this.getTotalStyle = getTotalStyle.bind(this);
        this.getColumnStyle = getColumnStyle.bind(this);
        this.getLinkStyle = getLinkStyle.bind(this);
        this.getTextStyle = getTextStyle.bind(this);
        this.getImageStyle = getImageStyle.bind(this);
    }

    render() {
        return(
            <div style={this.getTotalStyle}>
                <div style={this.getColumnStyle}>
                    <h5 style={this.getTextStyle}>Created For Musicians</h5>
                </div>

                <div style={this.getColumnStyle}>
                    <a style={this.getLinkStyle} href="https://www.github.com/chrisfandrade16">
                        <h5 style={this.getTextStyle}>My GitHub</h5>
                        <img src={git_icon} style={this.getImageStyle} alt="GitHub logo"></img>
                    </a>

                    <a style={this.getLinkStyle()} href="https://www.linkedin.com/in/chrisfandrade16">
                        <h5 style={this.getTextStyle}>My LinkedIn</h5>
                        <img src={linkedin_icon} style={this.getImageStyle} alt="LinkedIn logo"></img>
                    </a>
                </div>
            </div>
        );
    }
};
