import axios from 'axios';
import React, { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import parse from 'html-react-parser';
import { Redirect } from 'react-router-dom';
import { API, likertVals } from '../utils/constants';
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
			surveyPageCount: Object.getOwnPropertyNames(this.props.questionBank).length,
			currentStep: 1,
			prevStep: 1,
			surveyDateTime: new Date(),
			disabled: true,
			responses: [],
			seen_set: [],
			selectedmovie: props.location.state.selectedmovie,
			done: false,
			recs: props.location.state.recs,
			loading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.updateSurvey = this.updateSurveyResponse.bind(this);
	}

	updateSurveyResponse() {
		this.setState({
			loading: true
		});

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
							done: true,
							loading: false
						});
						this.props.progressUpdater();
					} else {
						this.setState({
							loading: false
						})
						this._next();
						this.props.progressUpdater();
					}
				}
			})
	}

	componentDidUpdate() {
		let prevStep = this.state.prevStep;
		if (prevStep !== this.state.currentStep) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			this.setState({
				prevStep: prevStep + 1
			});
		}
	}

	handleChange(event, qId, qText, qType, resVal, numQuestions) {
		let responses = this.state.responses;
		let response = {};

		let val = qType === "likert" ? likertVals.indexOf(resVal) + 1 : resVal;

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
		let pageid = this.state.pageid;
		let surveyDateTime = new Date();
		let responses = [];
		currentStep++;
		this.setState({
			currentStep: currentStep,
			disabled: true,
			surveyDateTime: surveyDateTime,
			responses: responses,
			papgeid: pageid + 1
		});
	}

	nextButton() {
		const currentStep = this.state.currentStep;
		let isFinalPage = this.props.finalPage || false;
		let buttonVariant = this.state.disabled ? 'secondary' : 'primary';
		if (currentStep < this.state.surveyPageCount || !isFinalPage) {
			return (
				<Button disabled={this.state.disabled && !this.state.loading}
					className="footer-btn"
					variant={buttonVariant} size="lg" onClick={this.updateSurvey}>
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
		return this.props.questionBank[idx];
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
					pathname: this.props.dest,
					state: {
						userid: userid,
						pageid: this.state.pageid + currentStep - 1
					}
				}} />
			)
		}

		return (
			<>
				<div className="jumbotron sticky-top surveytronShadow">
					<h4>{qSet.title}</h4>
					<p style={{ marginBottom: "0" }}>{parse(qSet.instruction)}</p>
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