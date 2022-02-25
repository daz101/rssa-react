import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

const loadingAnim = require("../res/loading.gif");

class LoadingAnimation extends Component {

	render() {
		return (
			<>
				<Container style={{overflowY: "hidden"}}>
					<h4 style={{
						margin: "6em auto 0 auto",
						width: "fit-content"
					}}>{this.props.waitMsg}</h4>
					<div>
						<img src={loadingAnim} alt="loading animation" style={{
							zIndex: "81",
							opacity: "0.1",
							margin: "-18em auto 0 auto",
							width: "99%",
							height: "90%",
							overflowY: "hidden"
						}} />
					</div>
				</Container>
			</>
		);
	}

}

export default LoadingAnimation;