import React, { Component } from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import parse from "html-react-parser";


const defaultMovieIco = require("../res/default_movie_icon.svg");

class SurveyMovieGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			watched: undefined,
			rating: undefined
		}
	}

	updateWatched(evt, watched, movie_id, qIndex, qText, strVal, qNums) {
		let val = strVal + ";" + movie_id;
		this.setState({
			watched: watched
		});
		this.props.handleChange(evt, qIndex, qText, "freeText", val, qNums);
	}

	updateRating(evt, rating, movie_id, qIndex, qText, strVal, qNums) {
		let val = strVal + ";" + movie_id;
		this.setState({
			rating: rating
		});
		this.props.handleChange(evt, qIndex, qText, "freeText", val, qNums);
	}

	render() {
		let currentMovie = this.props.movie;
		let reqQ1 = this.props.binaryQuestion;
		let reqQ2 = this.props.ratingQuestion;
		return (
			<>
				<FormGroup className="survey-question-block" >
					<div className="movieSurvey surveyQuestion" style={{ display: "flex" }}>
						<div key={"TN_" + currentMovie.movie_id} id={this.props.id}
							className="movieSurvey grid-item" style={{
								margin: "0",
								backgroundImage: "url(" + currentMovie.poster + "), url('" + defaultMovieIco + "')",
							}}>
							<div className="grid-item-label" style={{ position: "absolute" }}>
								{currentMovie.title + " (" + currentMovie.year + ")"}
							</div>
						</div>
						<div>
							<div className="font-weight-bold movieSurvey surveyQuestion">
								<p className="lead" style={{ marginLeft: "9px" }}>{parse(reqQ1.text)}</p>
							</div>
							<div className="movieSurvey checkboxGroup">
								{['Yes', 'No'].map((strVal, j) =>
									<FormLabel htmlFor={this.props.id + "_" + reqQ1.qId + "_" + j}
										key={this.props.id + "_" + reqQ1.qId + "_" + j} className="movieSurvey checkboxBtn"
										style={this.state.watched === j ? { backgroundColor: "#55AA55" } : {}} >
										<p className="movieSurvey checkboxLbl">{parse(strVal)}</p>
										<input className="radio-margin" type="radio"
											name={this.props.id + "_" + reqQ1.qId}
											id={this.props.id + "_" + reqQ1.qId + "_" + j}
											onChange={(evt) => this.updateWatched(evt, j, currentMovie.movie_id, 
												this.props.qIndex*2, reqQ1.text, strVal, this.props.qNums)}
										/>
									</FormLabel>
								)}
							</div>
							<div className="font-weight-bold movieSurvey surveyQuestion" style={{ marginTop: "27px" }}>
								<p className="lead" style={{ marginLeft: "9px" }}>{parse(reqQ2.text)}</p>
							</div>
							<div className="movieSurvey checkboxGroup">
								{[1, 2, 3, 4, 5].map(j =>
									<FormLabel htmlFor={this.props.id + "_" + reqQ2.qId + "_" + j}
										key={this.props.id + "_" + reqQ2.qId + "_" + j} className="movieSurvey checkboxBtn"
										style={this.state.rating === j ? { backgroundColor: "#55AA55" } : {}} >
										<div className="movieSurvey checkboxLbl">
											<div className="star-container" style={{
												position: "relative",
												verticalAlign: "middle", cursor: "pointer"
											}}>
												{Array.from({ length: j }, (_, k) => {
													return (
														<svg key={this.props.id + "_" + reqQ2.qId + "_" + j + "_" + k}
															viewBox="0 0 51 48" className="widget-svg"
															style={{
																width: "18px", height: "18px",
																transition: "transform 0.2s ease-in-out 0s"
															}}>
															<path className="star"
																style={{
																	fill: "rgb(252, 229, 65)",
																	transition: "fill 0.2s ease-in-out 0s"
																}}
																d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"></path>
														</svg>
													);
												})}
											</div>
										</div>
										<input className="radio-margin" type="radio"
											name={this.props.id + "_" + reqQ2.qId + "_" + j}
											id={this.props.id + "_" + reqQ2.qId + "_" + j}
											onChange={(evt) => this.updateRating(evt, j, currentMovie.movie_id, 
												this.props.qIndex*2+1, reqQ2.text, j, this.props.qNums)}
										/>
									</FormLabel>
								)}
							</div>
						</div>
					</div>
				</FormGroup>
			</>
		)
	}
}

export default SurveyMovieGroup;