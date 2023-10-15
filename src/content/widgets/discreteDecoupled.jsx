import axios from "axios";
import { Component } from "react";
import { Row } from "react-bootstrap";
import { API } from "../utils/constants";
import GridRow from "./gridRow";


class DiscreteDecoupled extends Component {

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
		const userlikes = this.state.data.filter(movie => movie.user_score > 3.5);
		const userdislikes = this.state.data.filter(movie => movie.user_score < 2.5);
		const communitylikes = this.state.data.filter(movie => movie.community_score > 3.5);
		const communitydislikes = this.state.data.filter(movie => movie.community_score < 2.5);

		return (
			<div className="viewdiv">
				<Row className="cellRow">
					<GridRow headerLabel={"Me"} data1={userlikes} data1Label={"Likes"}
						data2={userdislikes} data2Label={"Dislikes"} limit={20}
						onClickHandler={this.props.onClickHandler} />
				</Row>
				<Row className="cellRow">
					<GridRow headerLabel={"Community"} data1={communitylikes} data1Label={"Likes"}
						data2={communitydislikes} data2Label={"Dislikes"} limit={20}
						onClickHandler={this.props.onClickHandler} />
				</Row>
			</div>)
	}
}

export default DiscreteDecoupled;