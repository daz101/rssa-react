import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { API } from '../utils/constants';


class InstructionPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			instructionDateTime: undefined,
			pageid: 3,
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

		if (this.state.updateSuccess) {
			return (
				<Redirect to={{
					pathname: this.props.dest,
					state: {
						userid: userid
					}
				}} />
			);
		}

		return (
			<>
				<div className="jumbotron">
					<h1 className="header">Overview</h1>
					<p>The study consists of three steps.</p>
				</div>
				<div className="instructions-page">
					<div className="row">
						<div className="col-sm">
							<div className="card ">
								<img src="/Preference-rssa.png" className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title"> Select Preferences</h5>
									<p className="card-text">
										Rate movies for the system to learn about your
										preferences. You can select "Get another option" to get a new movie option.
									</p>
								</div>
							</div>
						</div>
						<div className="col-sm">
							<div className="card">
								<img src="/recommendation-rssa.png" className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">Rate Recommendations</h5>
									<p className="card-text">
										The system will provide recommendations and for each
										you will be asked to rate the recommendation.
									</p>
								</div>
							</div>
						</div>
						<div className="col-sm">
							<div className="card">
								<img src="/survey-rssa.png" className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">Complete Survey</h5>
									<p className="card-text">
										Lastly, you will be asked to complete a survey about
										your experience interacting with the system.
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

export default InstructionPage;