import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ReactHtmlParser from 'react-html-parser';
import { Redirect } from 'react-router-dom';
import { API, qBank } from '../utils/constants';
import SurveyPane from '../widgets/surveyPanes';
const defaultMovieIco = require("../res/default_movie_icon.svg");


class SurveyPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userid: props.location.state.userid,
			pickid: props.location.state.selectedid,
			finalRecommendations: props.location.state.recs,
			pageid: props.location.state.pageid + 1,
			surveyPageCount: 6,
			currentStep: 1,
			surveyDateTime: new Date(),
			disabled: true,
			responses: [],
			seen_set: [],
			selectedmovie: props.location.state.selectedmovie,
			done: false,
			recs: props.location.state.recs
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
			response: {
				responses: responses
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
					if (surveyPageCount === currentStep) {
						this.setState({
							done: true
						});
						this.props.progressUpdater(100);
					} else {
						this._next();
						this.props.progressUpdater();
					}
				}
			})
	}

	handleChange(event, qId, qText, qType, resVal, numQuestions) {
		let responses = this.state.responses;
		let response = {};

		let val = qType === "likert" ? resVal.indexOf(resVal) + 1 : resVal;

		if (!responses.some(res => res.id === qId)) {
			response = {
				id: qId,
				type: qType,
				text: qText,
				val: val
			};
			responses.push(response);
		} else {
			responses = responses.map(res => (
				res.id === qId ? {
					...res, val: val
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
		window.scrollTo(0, 0);
		this.setState({
			currentStep: currentStep,
			disabled: true,
			surveyDateTime: surveyDateTime,
			responses: responses
		});
	}

	nextButton() {
		const currentStep = this.state.currentStep;
		let buttonVariant = this.state.disabled ? 'secondary' : 'primary';
		if (currentStep < 6) {
			return (
				<Button disabled={this.state.disabled}
					className="footer-btn"
					variant={buttonVariant} size="lg" onClick={this.updateSurvey}>
					Next
				</Button>
			);
		} else {
			return (
				<Button disabled={this.state.disabled}
					className="footer-btn"
					variant={buttonVariant} size="lg" onClick={this.updateSurvey}>
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
		let recs = this.state.recs;
		
		let selectedmovie = this.state.selectedmovie;

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
			<>
				<div className="jumbotron sticky-top">
					<h4>{qSet.title}</h4>
					<p style={{ marginBottom: "0" }}>{ReactHtmlParser(qSet.instruction)}</p>
					{qSet.displayRecs ? (
						<div style={{ display: "flex" }}>
							{
								recs.map((currentMovie) => (
									<div key={"TN_" + currentMovie.movie_id} id={"TN_" + currentMovie.movie_id}
										className={"grid-item"} style={{
											width: "135px",
											height: "171px",
											margin: "0 3px",
											backgroundImage: "url(" + currentMovie.poster + "), url('" + defaultMovieIco + "')",
										}}>
										<div className="grid-item-label" style={{ position: "absolute" }}>
											{currentMovie.title + " (" + currentMovie.year + ")"}
										</div>
									</div>
								))
							}
						</div>
					) : qSet.showSelected ? (
						<div id={"TN_" + selectedmovie.id}
							className={"grid-item"} style={{
								width: "135px",
								height: "171px",
								margin: "0 3px",
								backgroundImage: "url(" + selectedmovie.poster + "), url('" + defaultMovieIco + "')",
							}}>
							<div className="grid-item-label" style={{ position: "absolute" }}>
								{selectedmovie.title + " (" + selectedmovie.year + ")"}
							</div>
						</div>
					) : <></>}
				</div>
				<div className="survey-page">
					<SurveyPane
						maxPanes={maxPanes}
						key={currentStep}
						currentStep={currentStep}
						handleChange={this.handleChange}
						stepFlag={currentStep}
						questions={qSet}
						recList={recs} />
					<div className="jumbotron jumbotron-footer">
						{this.nextButton()}
					</div>
				</div>
			</>
		);
	}
}

export default SurveyPage;