import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { likertVals } from '../utils/constants';
import SurveyMovieGroup from './SurveyMovieGroup';
import SurveyQuestionGroup from './surveyQuestionGroup';

class SurveyPane extends Component {

	render() {
		let qType = this.props.questions.qType;

		if (qType !== 'recFamiliarity') {
			let qNums = this.props.questions.qData.length;
			return (
				<>
					<Card bg="light" className="mb-3 justify-content-center">
						{this.props.questions.qData.map((likert, i) => (
							<SurveyQuestionGroup qText={likert.text} key={qType + "_" + i}
								qVals={likertVals} id={qType + "_" + likert.qId} qIndex={i} qNums={qNums}
								handleChange={this.props.handleChange} />
						))}
					</Card>
				</>
			);
		} else {
			let recs = this.props.recList;
			let qNums = recs.length*2;
			let reqQ1 = this.props.questions.qData[0];
			let reqQ2 = this.props.questions.qData[1];
			return (
				<>
					<Card bg="light" className="mb-3 justify-content-center">
						{recs.map((currentMovie, i) => (
							<SurveyMovieGroup key={qType + "_" + i} id={qType + "_" + i}
								movie={currentMovie} binaryQuestion={reqQ1} ratingQuestion={reqQ2}
								qIndex={i} qNums={qNums} handleChange={this.props.handleChange} />
						))}
					</Card>
				</>
			);
		}
	}
}

export default SurveyPane;