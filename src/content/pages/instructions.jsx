import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from "react-router-dom";
import { withMousePositionHook } from '../hooks/useMousePosition';
import { API } from '../utils/constants';

const surveyRssa = require("../res/survey-rssa.png");
const prefRssa = require("../res/Preference-rssa.png");
const recommendationRssa = require("../res/recommendation-rssa.png");

class InstructionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			instructionDateTime: undefined,
			pageid: props.location.state.pageid + 1,
			userid: props.location.state.userid,
			updateSuccess: false
		}
		this.updateSurvey = this.updateSurveyResponse.bind(this);
	}

	componentDidMount() {
		this.setState({
			instructionDateTime: new Date()
		});
	}

	updateSurveyResponse() {
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
						updateSuccess: true
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
					<p>Using the movie recommender system consists of three steps.</p>
				</div>
				<div className="instructions-page">
					<div className="row">
						<div className="col-sm">
							<div className="card ">
								<img src={prefRssa} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">Indicate Your Preference</h5>
									<p className="card-text">
										Please navigate through the endless list of movies and rate the
										ones you have watched on a 5-point scale. The system will use these
										ratings to learn about your preferences. Please rate at least 10 movies.
									</p>
								</div>
							</div>
						</div>
						<div className="col-sm">
							<div className="card">
								<img src={recommendationRssa} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">Refine Your Recommendations</h5>
									<p className="card-text">
										The system will give you a first list of 7 recommendations and a list of 7
										alternative items. Please rate all 14 items to refine the recommendations.
										You will do this step <strong>twice</strong>.
									</p>
								</div>
							</div>
						</div>
						<div className="col-sm">
							<div className="card">
								<img src={recommendationRssa} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">Select A Movie to Watch</h5>
									<p className="card-text">
										Once you have refined the recommendations twice, you will receive a final
										set of 7 recommendations and 7 alternative items. Please select the one item
										on this page that you are most interested in watching right now
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="jumbotron jumbotron-footer">
					<Button variant="primary" size="lg" className="footer-btn"
						onClick={this.updateSurvey}>
						Next
					</Button>
				</div>
			</>
		);
	}
}

export default withMousePositionHook(InstructionPage);