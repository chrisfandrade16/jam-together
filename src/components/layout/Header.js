import React, { Component } from "react";
import GIF from "../../utilities/layout/gif.js";
import logo0_png from "../../images/logo/logo0.png";
import logo1_png from "../../images/logo/logo1.png";
import logo2_png from "../../images/logo/logo2.png";
import logo3_png from "../../images/logo/logo3.png";
import logo4_png from "../../images/logo/logo4.png";
import logo5_png from "../../images/logo/logo5.png";
import logo6_png from "../../images/logo/logo6.png";
import logo7_png from "../../images/logo/logo7.png";
import logo8_png from "../../images/logo/logo8.png";
import logo9_png from "../../images/logo/logo9.png";
import logo10_png from "../../images/logo/logo10.png";
import logo11_png from "../../images/logo/logo11.png";
import logo12_png from "../../images/logo/logo12.png";
import logo13_png from "../../images/logo/logo13.png";
import logo14_png from "../../images/logo/logo14.png";
import logo15_png from "../../images/logo/logo15.png";
import logo16_png from "../../images/logo/logo16.png";
import logo17_png from "../../images/logo/logo17.png";
import logo18_png from "../../images/logo/logo18.png";
import logo19_png from "../../images/logo/logo19.png";
import logo20_png from "../../images/logo/logo20.png";
import logo21_png from "../../images/logo/logo21.png";
import logo22_png from "../../images/logo/logo22.png";
import logo23_png from "../../images/logo/logo23.png";
import logo24_png from "../../images/logo/logo24.png";
import logo25_png from "../../images/logo/logo25.png";
import logo26_png from "../../images/logo/logo26.png";
import logo27_png from "../../images/logo/logo27.png";
import logo28_png from "../../images/logo/logo28.png";
import github_png from "../../images/github.png";
import "../../styles/layout/header.css";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImage: logo0_png
        };
    }

    componentDidMount() {
        let frames = [ 
            logo0_png, logo1_png, logo2_png, logo3_png, logo4_png, logo5_png, logo6_png, logo7_png, logo8_png, logo9_png, logo10_png, logo11_png, logo12_png, logo13_png, logo14_png,
            logo15_png, logo16_png, logo17_png, logo18_png, logo19_png, logo20_png, logo21_png, logo22_png, logo23_png, logo24_png, logo25_png, logo26_png, logo27_png, logo28_png
        ];

        let frames_length = frames.length;
        let images = new Array(frames_length);

        for(let index = 0; index < frames_length; index++)
        {
            let image = new Image();
            image.src = frames[index];
            images[index] = image;
        }

        let div = document.querySelector(".navigator-left");
        let logo = new GIF(div, frames, 15);

        logo.initialize();

        div.addEventListener('mouseenter', () => {
            logo.resume();
            div.style.filter = "grayscale(0%) brightness(100%)";
        });
        div.addEventListener('mouseleave', () => {
            logo.pause();
            div.style.filter = "grayscale(100%) brightness(275%)";
        });
    }

    render() {
        const { currentImage } = this.state;

        return(
            <div className="navigator">
                <div className="navigator-left"></div>
                <div className="navigator-middle">
                    <div className="navigator-middle-link" style={this.props.lobbies}>Lobbies</div>
                    <div className="navigator-middle-link" style={this.props.profile}>Profile</div>
                </div>
                <div className="navigator-right">
                    <a className="navigator-right-link" href="https://www.github.com/chrisfandrade16/jam-together" target="_blank">
                        <img className="navigator-right-link-image" src={github_png}></img>
                    </a>
                </div>
            </div>
        );
    }
};
