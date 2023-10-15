import React, { Component } from 'react';

class SizeWarningDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			screenWidth: undefined
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateWindowDimensions);
		this.setState({ screenWidth: window.innerWidth });
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions)
	}

	updateWindowDimensions() {
		this.setState({ screenWidth: window.innerWidth });
	}

	render() {

		// console.log(this.state.screenWidth);
		let show = this.state.screenWidth < 1260;

		return (
			<div className="sizeWarningDialog" style={{ visibility: show ? "unset" : "hidden" }}>
				<p style={{ margin: "9px auto 0", fontSize: "2em", lineHeight: "1.2", fontWeight: "500" }}>
					Window Dimension Too Small
				</p>
				<hr />
				<p style={{ fontSize: "1.5em", margin: "0 auto" }}>
					For optimal viewing please increase your browser width that the green border is inside the viewing area.
				</p>
			</div>
		)
	}
}

export default SizeWarningDialog;