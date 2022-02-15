import React, { Component } from 'react';
import 'react-step-progress-bar/styles.css';
import ProgressBarComponent from '../widgets/progressBar';
import Button from 'react-bootstrap/Button';
import SurveyPane from '../widgets/surveyPanes';
import { qBank, likertVals, API } from '../utils/constants';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';


class SurveyPage extends Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			userid: props.location.state.userid,
			pickid: props.location.state.selectedid,
			pageid: 8,
			surveyPageCount: 6,
			currentStep: 1,
			surveyDateTime: new Date(),
			disabled: true,
			responses: [],
			seen_set: [],
			done: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.updateSurvey = this.updateSurveyResponse.bind(this);
	}

	updateSurveyResponse() {
		let currentStep = this.state.currentStep;
		let surveyPageCount = this.state.surveyPageCount;

		let surveyDateTime = this.state.surveyDateTime;
		let surveyEndTime = new Date();
		let pageid = this.state.pageid + currentStep - 1;
		let userid = this.state.userid;
		let responses = this.state.responses;



		axios.put(API + 'add_survey_response', {
			starttime: surveyDateTime.toUTCString(),
			endtime: surveyEndTime.toUTCString(),
			pageid: pageid,
			userid: userid,
			response: { responses: responses }
		},
		{
			headers: {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin': '*'
			}
		})
			.then(response => {
				if (response.status === 200) {
					if (surveyPageCount === currentStep) {
						this.setState({
							done: true
						});
					} else {
						this._next();
					}
				}
			})
	}

	handleChange(event, qId, qText, likertVal, numQuestions) {
		let responses = this.state.responses;
		let response = {};

		if (!responses.some(res => res.id === qId)) {
			response = {
				id: qId,
				text: qText,
				val: likertVals.indexOf(likertVal) + 1
			};
			responses.push(response);
		} else {
			responses = responses.map(res => (
				res.id === qId ? {
					...res, val: likertVals.indexOf(likertVal) + 1
				} : res
			));
		}

		this.setState({
			responses: responses,
			disabled: !(responses.length === numQuestions)
		})
	}


	/*
	functions to handle next and previous buttons 
	*/
	_next = () => {
		let currentStep = this.state.currentStep;
		let surveyDateTime = new Date();
		let responses = [];
		currentStep++;
		this.setState({
			currentStep: currentStep,
			disabled: true,
			surveyDateTime: surveyDateTime,
			responses: responses
		});
	}

	nextButton() {
		const currentStep = this.state.currentStep;
		if (currentStep < 6) {
			return (
				<Button disabled={this.state.disabled}
					style={{ float: "right" }} type="primary" onClick={this.updateSurvey}>
					Next
				</Button>
			);
		} else {
			return (
				<Button disabled={this.state.disabled}
					style={{ float: "right" }} type="primary" onClick={this.updateSurvey}>
					Submit
				</Button>
			);
		}
	}

	getQuestions(idx) {
		return qBank[idx];
	};

	render() {
		let maxPanes = this.state.surveyPageCount;
		let currentStep = this.state.currentStep;
		let userid = this.state.userid;
		let done = this.state.done;
		let qSet = this.getQuestions(currentStep);

		if (done) {
			return (
				<Redirect to={{
					pathname: "/exit",
					state: {
						completed: done,
						userid: userid
					}
				}} />
			)
		}

		return (
			// <div className="contentWrapper">
			// 	<div style={{ margin: "0 3em" }}>
			// 		<ProgressBarComponent percentComplete={90} />
			<>
			                    <div className="jumbotron">
						{/* <h1 className="header">Post-task Survey</h1> */}
						<h4>Scenario {currentStep} out of {maxPanes}:</h4>
					{/* <p>{ReactHtmlParser(qInstruct)}</p> */}
                        <p>{ReactHtmlParser(qSet.instruction)}</p>
                    </div>
					<div className="survey-page">
						<SurveyPane
							maxPanes={maxPanes}
							key={currentStep}
							currentStep={currentStep}
							handleChange={this.handleChange}
							stepFlag={currentStep}
							questions={qSet} />
						{this.nextButton()}
					</div>
				{/* </div>
			</div> */}
			</>
		);
	}
}

export default SurveyPage;