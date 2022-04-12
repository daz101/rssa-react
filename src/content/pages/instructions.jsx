import axios from 'axios';
import React, { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { withMousePositionHook } from '../hooks/useMousePosition';
import { API } from '../utils/constants';
import { Card } from 'react-bootstrap';

const prefRssa = require("../res/rssa-preferences.png");
const recommendationRssa = require("../res/rssa-ratingrecs.png");
const finalRssa = require("../res/rssa-finalrecs.png");
const survey = require("../res/rssa-survey.png")

class InstructionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			instructionDateTime: undefined,
			pageid: props.location.state.pageid + 1,
			userid: props.location.state.userid,
			updateSuccess: false,
			loading: false
		}
		this.updateSurvey = this.updateSurveyResponse.bind(this);
	}

	componentDidMount() {
		this.setState({
			instructionDateTime: new Date()
		});
	}

	updateSurveyResponse() {
		this.setState({
			loading: true
		});

		let instructionDateTime = this.state.instructionDateTime;
		let instructionEndTime = new Date();
		let pageid = this.state.pageid;
		let userid = this.state.userid;

		axios.put(API + 'add_survey_response', {
			pageid: pageid,
			userid: userid,
			starttime: instructionDateTime.toUTCString(),
			endtime: instructionEndTime.toUTCString(),
			response: {}
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
						updateSuccess: true,
						loading: false
					});
					this.props.progressUpdater();
				}
			});
	}

	render() {
		let userid = this.state.userid;
		let pageid = this.state.pageid;

		const mousePos = this.props.mousePositionHook;
		const pageHeight = document.body.scrollHeight;
		const pageWidth = document.body.scrollWidth;

		if (this.state.updateSuccess) {
			this.props.activitySync(mousePos, pageHeight, pageWidth, userid, pageid);
			return (
				<Redirect to={{
					pathname: this.props.dest,
					state: {
						userid: userid,
						pageid: pageid
					}
				}} />
			);
		}

		return (
			<>
				<div className="jumbotron">
					<h1 className="header">Instructions on how to use the system</h1>
					<p>Using the movie recommender system consists of four steps.</p>
				</div>
				<div className="instructions-page">
					<div className="row">
						<div className="col-sm d-flex align-self-stretch">
							<Card>
								<img src={prefRssa} className="card-img-top" alt="..." />
								<Card.Body className="d-flex flex-column">
									<Card.Title>Indicate Your Preference</Card.Title>
									<Card.Text>
										Please navigate through the endless list of movies and rate the
										ones you have watched on a 5-point scale. The system will use these
										ratings to learn about your preferences. Please rate at least 10 movies.
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
						<div className="col-sm d-flex align-self-stretch">
							<Card>
								<img src={recommendationRssa} className="card-img-top" alt="..." />
								<Card.Body className="d-flex flex-column">
									<Card.Title>Refine Your Recommendations</Card.Title>
									<Card.Text>
										The system will give you a first list of 7 recommendations and a list of 7
										alternative items. Please rate all 14 items to refine the recommendations.
										You will do this step <strong>twice</strong>.
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
						<div className="col-sm d-flex align-self-stretch">
							<Card>
								<img src={finalRssa} className="card-img-top" alt="..." />
								<Card.Body className="d-flex flex-column">
									<Card.Title>Select A Movie to Watch</Card.Title>
									<Card.Text>
										Once you have refined the recommendations twice, you will receive a final
										set of 7 recommendations and 7 alternative items. Please select the one item
										on this page that you are most interested in watching right now
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
						<div className="col-sm d-flex align-self-stretch">
							<Card>
								<img src={survey} className="card-img-top" alt="..." />
								<Card.Body className="d-flex flex-column">
									<Card.Title>Complete Survey</Card.Title>
									<Card.Text>
										Complete a survey about your experience interacting with the system.
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					</div>
				</div>
				<div className="jumbotron jumbotron-footer">
					<Button variant="primary" size="lg" className="footer-btn"
						disabled={this.state.loading}
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
		);
	}
}

export default withMousePositionHook(InstructionPage);