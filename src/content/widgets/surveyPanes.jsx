import React, { Component } from 'react';
import { Card, FormGroup, FormLabel } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { likertVals } from '../utils/constants';

class SurveyPane extends Component {

	render() {
		let qNums = this.props.questions.qData.length;
		let qType = this.props.questions.qType;
		return (
			<>
				<Card bg="light" className="mb-3 justify-content-center">
					{this.props.questions.qData.map((likert, i) => (
						<FormGroup className="survey-question-block" key={qType + "_" + i} >
							<div className="font-weight-bold surveyQuestion">
								<p className="lead">{ReactHtmlParser(likert.text)}</p></div>
							<div className="checkboxGroup">
								{likertVals.map((strVal, j) =>
									<FormLabel htmlFor={qType + "_" + likert.qId + "_" + j}
										key={qType + "_" + i + "_" + j} className="checkboxBtn">
										<p className="checkboxLbl">{ReactHtmlParser(strVal)}</p>
										<input className="radio-margin" type="radio"
											name={qType + "_" + likert.qId}
											id={qType + "_" + likert.qId + "_" + j}
											onChange={(evt) => this.props.handleChange(
												evt, i, likert.text, strVal,
												qNums
											)}
										/>
									</FormLabel>
								)}
							</div>
						</FormGroup>
					))}
				</Card>
			</>

		);
	}
}

export default SurveyPane;