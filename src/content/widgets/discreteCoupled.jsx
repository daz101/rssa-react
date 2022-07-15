import axios from "axios";
import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { API } from "../utils/constants";
import GridRow from "./gridRow";

class DiscreteCoupled extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}
	}

	getData() {
		axios
			.get(API + 'disc_cont_coupled')
			.then(response => {
				this.setState({
					data: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		const ulcl = this.state.data.filter(movie => movie.user_score > 3.5 && movie.community_score > 3.5);
		const ulcd = this.state.data.filter(movie => movie.user_score > 3.5 && movie.community_score < 2.5);
		const udcl = this.state.data.filter(movie => movie.user_score < 2.5 && movie.community_score > 3.5);
		const udcd = this.state.data.filter(movie => movie.user_score < 2.5 && movie.community_score < 2.5);

		return (
			<div className="viewdiv">
				<Row>
					<Col className="cellLabelTop" sm={{ span: 5, offset: 2 }}>
						<h4>My Likes</h4>
					</Col>
					<Col className="cellLabelTop" sm={{ span: 5 }}>
						<h4>My Dislikes</h4>
					</Col>
				</Row>
				<Row className="cellRow">
					<Col className="cellLabelLeft" sm={{ span: 2 }}>
						<h4 style={{ marginTop: "100%" }}>Community Likes</h4>
					</Col>
					<Col sm={{ span: 10 }}>
						<GridRow data1={ulcl} data2={udcl} limit={20}
							onClickHandler={this.props.onClickHandler} />
					</Col>
				</Row>
				<Row className="cellRow">
					<Col className="cellLabelLeft" sm={{ span: 2 }}>
						<h4 style={{ marginTop: "100%" }}>Community Dislikes</h4>
					</Col>
					<Col sm={{ span: 10 }}>
						<GridRow data1={ulcd} data2={udcd} limit={20}
							onClickHandler={this.props.onClickHandler} />
					</Col>
				</Row>
			</div>)
	}
}

export default DiscreteCoupled;