import React, {Component} from "react";
import {ProgressBar, Step} from "react-step-progress-bar";

const one = require("../res/one.png");
const two = require("../res/two.png");
const three = require("../res/three.png");
const four = require("../res/four.png");
const five = require("../res/five.png");

class ProgressBarComponent extends Component{

	render() {
		return (
			<>
				<ProgressBar
					percent={this.props.percentComplete}
					filledBackground="linear-gradient(to right, #fefb72, #f0bb31)">

					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{filter: `grayscale(${accomplished ? 0 : 100}%)`}}
								width="30"
								src={one}
								alt={1}
							/>
						)}
					</Step>
					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{filter: `grayscale(${accomplished ? 0 : 100}%)`}}
								width="30"
								src={two}
								alt={2}
							/>
						)}
					</Step>
					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{paddingright: 90, filter: `grayscale(${accomplished ? 0 : 100}%)`}}
								width="30"
								src={three}
								alt={3}
							/>
						)}
					</Step>

					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{filter: `grayscale(${accomplished ? 0 : 100}%)`}}
								width="30"
								src={four}
								alt={4}
							/>
						)}
					</Step>

					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}}
								width="30"
								src={five}
								alt={5}
							/>
						)}
					</Step>
				</ProgressBar>
			</>
		);
	}
}

export default ProgressBarComponent;