import { Component } from "react";
import { Col, Row } from "react-bootstrap";


class DiscreteDecoupled extends Component {
	render() {
		return (
			<div style={{ height: "700px", width: "900px", backgroundColor: "gray", margin: "1.8em" }}>
				<Row>
					<Col>Me</Col>
					<Col>Community</Col>
				</Row>
				<Row>
					<Col>Me</Col>
					<Col></Col>
					<Col></Col>
				</Row>
				<Row>
					<Col>Community</Col>
					<Col></Col>
					<Col></Col>
				</Row>
			</div>)
	}
}

export default DiscreteDecoupled;