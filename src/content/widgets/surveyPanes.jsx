import React, { Component } from 'react';
import { likertVals } from '../utils/constants';
import ReactHtmlParser from 'react-html-parser';

class SurveyPane extends Component {

	render() {
		let qNums = this.props.questions.qData.length;
		let qType = this.props.questions.qType;
		let qInstruct = this.props.questions.instruction;
		let paneCount = this.props.maxPanes;
		return (
			<div className="card bg-light mb-3">
				<div className="card-body">
					<h4>Scenario {this.props.currentStep} out of {paneCount}:</h4>
					<p>{ReactHtmlParser(qInstruct)}</p>
					{this.props.questions.qData.map((likert, i) => (
						<div className="form-group survey-question" controlid={qType + "_" + i} key={qType + "_" + i} >
							<div className="form-row">
								<label is="legend" className="font-weight-bold">
									<strong>{ReactHtmlParser(likert.text)}</strong></label>
								<div className="col">
									{likertVals.map((strVal, j) =>
										<label htmlFor={qType + "_" + likert.qId + "_" + j}
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
										</label>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default SurveyPane;
