import axios from 'axios';
import React, { Component } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { API } from '../utils/constants';

class ClosingRecommendationPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recs: props.location.state.recs,
			ratings: props.location.state.ratings,
			userid: props.location.state.userid,
			pageid: props.location.state.pageid + 1,
			selectedmovie: props.location.state.selectedmovie,
			starttime: undefined,
			userText: '',
			userResponded: false,
			loading: false
		};

		this.updateSurvey = this.updateSurveyResponse.bind(this);
	}

	componentDidMount() {
		this.setState({
			starttime: new Date()
		});
	}

	updateSurveyResponse() {
		this.setState({
			loading: true
		});

		let startime = this.state.starttime;
		let endtime = new Date();
		let pageid = this.state.pageid;
		let userid = this.state.userid;
		let userText = this.state.userText;

		axios.put(API + 'add_survey_response', {
			pageid: pageid,
			userid: userid,
			starttime: startime.toUTCString(),
			endtime: endtime.toUTCString(),
			response: {
				responses: [
					{
						type: 'text',
						text: 'Did anything go wrong while using the system?',
						val: userText,
					}]
			}
		})
			.then(response => {
				if (response.status === 200) {
					this.setState({
						updateSuccess: true,
						loading: false
					});
				}
				this.props.progressUpdater(10);
			})
	}

	onValueChange = (event) => {
		let responseText = event.target.value;
		this.setState({
			userText: responseText,
			userResponded: responseText.length > 1
		});
	}

	render() {
		let buttonDisabled = !this.state.userResponded;

		let userid = this.state.userid;
		let ratings = this.state.ratings;
		let recs = this.state.recs;
		let pageid = this.state.pageid;
		let selectedmovie = this.state.selectedmovie;

		let buttonVariant = buttonDisabled ? 'secondary' : 'primary';

		if (this.state.updateSuccess) {
			return (
				<Redirect to={{
					pathname: this.props.dest,
					state: {
						userid: userid,
						ratings: ratings,
						recs: recs,
						pageid: pageid,
						selectedmovie: selectedmovie
					}
				}} />
			);
		}

		return (
			<>
				<div className="jumbotron">
					<h1 className="header">Thank you for interacting with the movie recommender system.</h1>
					<p>We will now ask you several questions about your experience interacting with the system.
					</p>
				</div>
				<Card bg="light">
					<Card.Body>
						<Card.Title>Did anything go wrong while using the system?</Card.Title>
						<Form.Group className="mb-3" controlId="responseText">
							<Form.Label>We appreciate the feedback.</Form.Label>
							<Form.Control as="textarea" rows={3} onChange={this.onValueChange} />
						</Form.Group>

					</Card.Body>
				</Card>
				<div className="jumbotron jumbotron-footer">
					<Button className="footer-btn" variant={buttonVariant} size="lg"
						disabled={buttonDisabled && !this.state.loading}
						onClick={this.updateSurvey}>
						{!this.state.loading ? 'Next'
							:
							<>

								<Spinner
									as="span"
									animation="grow"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
								Loading...
							</>
						}
					</Button>
				</div>
			</>
		)
	}
}

export default ClosingRecommendationPage;