import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import axios from "axios";
import { API } from "../utils/constants";

class ExitPage extends Component {

	constructor(props) {
		super(props);
		let userid = undefined;
		let completed = false;
		if (this.props.location.state !== undefined){
			userid = this.props.location.state.userid;
			completed = this.props.location.state.completed;
		}
		this.state = {
			pageid: 14,
			userid: userid,
			completed: completed,
			code: undefined
		}
	}

	componentDidMount() {
		if (this.state.completed){
			this.getCompletionCode();
		}
	}

	getCompletionCode() {
		let userid = this.state.userid;
		let completed = this.state.completed;
		let pageid = this.state.pageid;
		let requestTime = new Date();

		axios.post(API + 'completionCode', {
			pageid: pageid,
			requestime: requestTime.toUTCString(),
			userid: userid,
			completed: completed
		},
			{
				headers: {
					'Access-Control-Allow-Credentials': true,
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(response => {
				if (response.status === 200) {
					this.setState({
						code: response.data['user_code']
					})
				}
			});
	}

	render() {
		let code = this.state.code;
		let completed = this.state.completed;

		return (
			<div className="contentWrapper">
				<div style={{ margin: "0 3em" }}>
					<div className="jumbotron">
						<h4>End of Study</h4>
						{completed ?
							<p>Thank you for completing the survey.</p>
							:
							<p>Thank you for your interest in the study.</p>
						}
					</div>
					<div className="exit-page">
						<Card bg="light">
							{completed ? (
								<Card.Body>
									<p>
										Your Amazon Mechanical Turk code to claim your payment is:
									</p>
									<div style={{
										margin: "1em 3em", padding: "1.25em 1.5em 0.25em",
										backgroundColor: "silver", width: "fit-content"
									}}>
										<p style={{ fontSize: "larger" }}>
											<strong>{code}</strong>
										</p>
									</div>
									<p>
										Please save this safely so you can claim your payment. We will endevour to validate
										the codes as soon as possible.
									</p>
								</Card.Body>
							) : (
								<Card.Body>
									<p>You decided not to participate in the study. Maybe next time <span role="img" aria-label="Smile ">&#128512;</span>. </p>
								</Card.Body>
							)}
						</Card>
					</div>
				</div>
			</div>

		);
	}
}

export default ExitPage;