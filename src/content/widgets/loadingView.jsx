import React, {Component} from 'react';
import { Container } from 'react-bootstrap';

class LoadingAnimation extends Component {


	render() {
		return (
			<>
			<Container>
				{/* <div> */}
					<h4 style={{
						position: "absolute",
						margin: "6em 0em 0 18em"
					}}>Please hang on while we find the recommendations for you.</h4>
				{/* </div> */}
				<img src="/loading.gif" alt="loading animation" style={{
					    zIndex: "81",
						opacity: "0.2",
						margin: "-4em",
						position: "absolute",
						width: "99%",
						height: "99%",
						overflow: "hidden"
				}} />
			</Container>
			</>
		);
	}

}

export default LoadingAnimation;