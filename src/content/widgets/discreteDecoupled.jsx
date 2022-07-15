import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { API } from "../utils/constants";


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
					<Col className="cellLabelLeft" sm={{ span: 2 }}>
						<h4 style={{ marginTop: "100%" }}>Me</h4>
					</Col>
					<Col className="cellblock" sm={{ span: 5 }}>
						{
							userlikes.slice(0, 20).map(movie => (
								<img src={movie.poster} alt={movie.title} key={movie.item_id}
									width={54} height={54}
									style={{ margin: "0.3em", cursor: "pointer" }}
									onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/default_movie_icon.svg"; }}
									onClick={evt => this.props.onClickHandler(true, movie)} />
							))
						}
					</Col>
					<Col className="cellblock" sm={{ span: 5 }}>
						{
							userdislikes.slice(0, 20).map(movie => (
								<img src={movie.poster} alt={movie.title} key={movie.item_id}
									width={54} height={54}
									style={{ margin: "0.3em", cursor: "pointer" }}
									onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/default_movie_icon.svg"; }}
									onClick={evt => this.props.onClickHandler(true, movie)} />
							))
						}
					</Col>
				</Row>
				<Row>
					<Col className="cellLabelBottom" sm={{ span: 5, offset: 2 }}>
						<h4>Likes</h4>
					</Col>
					<Col className="cellLabelBottom" sm={{ span: 5 }}>
						<h4>Dislikes</h4>
					</Col>
				</Row>
				<Row className="cellRow">
					<Col className="cellLabelLeft" sm={{ span: 2 }}>
						<h4 style={{ marginTop: "100%" }}>Community</h4>
					</Col>
					<Col className="cellblock" sm={{ span: 5 }}>
						{
							communitylikes.slice(0, 20).map(movie => (
								<img src={movie.poster} alt={movie.title} key={movie.item_id}
									width={54} height={54}
									style={{ margin: "0.3em", cursor: "pointer" }}
									onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/default_movie_icon.svg"; }}
									onClick={evt => this.props.onClickHandler(true, movie)} />
							))
						}
					</Col>
					<Col className="cellblock" sm={{ span: 5 }}>
						{
							communitydislikes.slice(0, 20).map(movie => (
								<img src={movie.poster} alt={movie.title} key={movie.item_id}
									width={54} height={54}
									style={{ margin: "0.3em", cursor: "pointer" }}
									onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/default_movie_icon.svg"; }}
									onClick={evt => this.props.onClickHandler(true, movie)} />
							))
						}
					</Col>
				</Row>
				<Row >
					<Col className="cellLabelBottom" sm={{ span: 5, offset: 2 }}>
						<h4>Likes</h4>
					</Col>
					<Col className="cellLabelBottom" sm={{ span: 5 }}>
						<h4>Dislikes</h4>
					</Col>
				</Row>
			</div>)
	}
}

export default DiscreteDecoupled;