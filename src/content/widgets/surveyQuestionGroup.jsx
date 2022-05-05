import React, { Component } from 'react';
import { FormGroup, FormLabel } from "react-bootstrap";
import parse from 'html-react-parser';


class SurveyQuestionGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: undefined
		}
		this.changeSelected = this.updateSelected.bind(this);
	}

	updateSelected(evt, qIndex, qText, strVal, qNums, j) {
		this.setState({
			selected: parseInt(evt.target.value)
		});
		this.props.handleChange(evt, qIndex, qText, "likert", strVal, qNums);
	}

	render() {
		return (
			<>
				<FormGroup className="survey-question-block"  >
					<div className="font-weight-bold surveyQuestion">
						<p className="lead" style={{marginBottom: "3px"}}>{parse(this.props.qText)}</p></div>
					<div className="checkboxGroup">
						{this.props.qVals.map((strVal, j) => {
							return (
								<FormLabel htmlFor={this.props.qType + "_" + this.props.qIndex + "_" + j}
									key={this.props.qType + "_" + this.props.qIndex + "_" + j} className="checkboxBtn"
									style={this.state.selected === j ? { backgroundColor: "#55AA55" } : {}}>
									<p className="checkboxLbl">{parse(strVal)}</p>
									<input className="radio-margin" type="radio"
										name={this.props.id}
										value={j}
										id={this.props.qType + "_" + this.props.qIndex + "_" + j}
										onChange={(evt) => this.changeSelected(
											evt, this.props.qIndex, this.props.qText, strVal,
											this.props.qNums
										)}
									/>
								</FormLabel>
							);
						}
						)}
					</div>
				</FormGroup>
			</>
		);
	}
}

export default SurveyQuestionGroup;