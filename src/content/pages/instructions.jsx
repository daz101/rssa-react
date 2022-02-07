import 'bootstrap/dist/css/bootstrap.min.css';
import "react-step-progress-bar/styles.css";
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import ProgressBarComponent from "../widgets/progressBar";
import axios from 'axios';
import { API } from '../constants';


class InstructionPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			instructionDateTime: undefined
		}
	}

	componentDidMount() {
		this.setState({
			instructionDateTime: new Date()
		});
	}

	updateServerTime() {
		let instructionDateTime = this.state.instructionDateTime;
		let instructionEndTime = new Date();

		axios.post(API + 'updateSurveyResponse', {
			instructionStartTime: instructionDateTime.toUTCString(),
			instructionEndTime: instructionEndTime.toUTCString()
		},
		{
			headers: {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(response => {
			if (response.status === 200){
				this.setState({
					userCreated: true,
					userid: response.data['user_id']
				});
			}
		})
	}

	render() {
		let userid = this.props.location.state.userid;

		return (
			<div className="contentWrapper">
				<ProgressBarComponent percentComplete={30} />
				<br />
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
				<div style={{ marginTop: "1em" }}>
					<Link to={{
						pathname: "/ratemovies",
						state: {
							userid: userid
						}
					}}>
						<Button variant="primary" size="lg" style={{ float: 'right' }}>
							Next
						</Button>
					</Link>
				</div>
			</div>
		);
	}
}

export default InstructionPage;