import React, {Component} from "react";
import {ProgressBar, Step} from "react-step-progress-bar";


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
								style={{marginLeft: 40, filter: `grayscale(${accomplished ? 0 : 100}%)`}}
								width="30"
								src="/one.png"
								alt={1}
							/>
						)}
					</Step>
					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{filter: `grayscale(${accomplished ? 0 : 100}%)`}}
								width="30"
								src="/two.png"
								alt={2}
							/>
						)}
					</Step>
					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{paddingright: 90, filter: `grayscale(${accomplished ? 0 : 100}%)`}}
								width="30"
								src="/three.png"
								alt={3}
							/>
						)}
					</Step>

					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{filter: `grayscale(${accomplished ? 0 : 100}%)`}}
								width="30"
								src="/four.png"
								alt={4}
							/>
						)}
					</Step>

					<Step transition="scale">
						{({accomplished}) => (
							<img
								style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}}
								width="30"
								src="/five.png"
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