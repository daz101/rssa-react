import React, { Component } from 'react';
import { Card, Nav } from "react-bootstrap";
import axios from "axios";
import { API } from "../utils/constants";

class ExitPage extends Component {

	constructor(props) {
		super(props);
		let userid = undefined;
		let completed = false;
		if (this.props.location.state !== undefined) {
			userid = this.props.location.state.userid;
			completed = this.props.location.state.completed;
		}
		this.state = {
			pageid: props.location.state.pageid + 1,
			userid: userid,
			starttime: new Date(),
			completed: completed,
			code: undefined
		}
	}

	componentDidMount() {
		if (this.state.completed) {
			this.getCompletionCode();
		}
	}

	getCompletionCode() {
		let userid = this.state.userid;
		let completed = this.state.completed;
		let pageid = this.state.pageid;
		let starttime = this.state.starttime;
		let requestTime = new Date();

		axios.post(API + 'redirect', {
			pageid: pageid,
			starttime: starttime.toUTCString(),
			requestime: requestTime.toUTCString(),
			userid: userid,
			response: {
				completed: completed
			}
		},
			{
				headers: {
					'Access-Control-Allow-Credentials': true,
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(response => {
				if (response.status === 200) {
					window.location.href = response.data['redirect_url'];
				}
			});
	}

	render() {
		let redirect_url = this.state.redirect_url;
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
										You will now be redirected back to Prolific. If you are not redirected
										automatically in more than 15 seconds click the link below.
									</p>
									<div style={{
										margin: "1em 3em", padding: "1.25em 1.5em 0.25em",
										width: "fit-content"
									}}>
										<Nav.Link className="" href={redirect_url}>
											Take me back.
										</Nav.Link>
									</div>
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