import React, { Component } from 'react';
import { likertVals } from '../utils/constants';
import ReactHtmlParser from 'react-html-parser';
import { Container, Card, FormGroup, FormLabel, Col, Form } from 'react-bootstrap';

class SurveyPane extends Component {

	render() {
		let qNums = this.props.questions.qData.length;
		let qType = this.props.questions.qType;
		let qInstruct = this.props.questions.instruction;
		let paneCount = this.props.maxPanes;
		return (
			// <div className="card bg-light mb-3">
			// <Container>
				// {/* <div className="card-body"> */}
				<>
				<Card bg="light" className="mb-3 justify-content-center">
					{this.props.questions.qData.map((likert, i) => (
						// <div className="form-group survey-question" controlid={qType + "_" + i} key={qType + "_" + i} >
						// controlId={qType + "_" + i} 
						<FormGroup className="survey-question-block" key={qType + "_" + i} >
							{/* <div className="form-row"> */}
							{/* <Form */}
								<div className="font-weight-bold surveyQuestion">
									<p className="lead">{ReactHtmlParser(likert.text)}</p></div>
								{/* <div className="col"> */}
								{/* <Col> */}
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
									{/* </Col> */}
								{/* </div> */}
							{/* </div> */}
						{/* </div> */}
						</FormGroup>
					))}
					</Card>
					</>

		);
	}
}

export default SurveyPane;