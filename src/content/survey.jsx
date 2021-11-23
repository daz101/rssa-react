import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import ProgressBarComponent from "./progressBarComponent";
import Button from 'react-bootstrap/Button';
import ReactHtmlParser from 'react-html-parser';

class SurveyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toInstructions: false,
      questions: [],
      disabled: true,
      currentStep: 1,
      seen_set: []
    };
    const user = this.props.user;
    /* user.acceptTerms = true;*/
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.testcheat = this.testcheat.bind(this);
  }

  testcheat(){
    this.setState({
      disabled: false
    })
  }

  cheatButton(){
    const currentStep = this.state.currentStep;
    if (currentStep < 6) {
      return (
          <Button style={{float: "left"}} type="primary" onClick={this.testcheat}>
            Cheat
          </Button>
      );
    }
    return null;
  }

  handleChange(evt) {
    const questions = this.state.questions;
    let newQ = { "question": evt.target.id, "answer": evt.target.value };

    if (evt.target.id !== "formGridAge" && evt.target.id !== "formGridGender") {
      const fields = evt.target.id.split('-');
      newQ = { "question": fields[0], "answer": fields[1] };
    }

    // check existing question/answer list
    // if match found, filter out the match before pushing updated version
    const matchIdx = questions.findIndex(q => (q.question === newQ.question));
    if (matchIdx >= 0) {
      questions[matchIdx].answer = newQ.answer;
    } else {
      questions.push(newQ);
    }
    const currentStep = this.state.currentStep;
    const disabled = !((currentStep === 1 && questions.length === 6) || 
                        (currentStep === 2 && questions.length === 12) || 
                        (currentStep === 3 && questions.length === 19) || 
                        (currentStep === 4 && questions.length === 24) || 
                        (currentStep === 5 && questions.length === 31) || 
                        (currentStep === 6 && questions.length === 37));
    this.setState({ questions: questions, disabled: disabled });
  }


  /*
  functions to handle next and previous buttons 
  */

  _next = () => {
    let currentStep = this.state.currentStep;
    // currentStep = currentStep >= 2 ? 6 : currentStep + 1;
    currentStep++;
    this.setState({ currentStep: currentStep, disabled: true });
  }

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({ currentStep: currentStep, disabled: true });
  }

  previousButton() {
    const currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <Button
            type="secondary" style={{float: "right"}} onClick={this._prev}>
          Previous
        </Button>
      );
    }
    return null;
  }

  nextButton() {
    const currentStep = this.state.currentStep;
    if (currentStep < 6) {
      return (
        <Button disabled={this.state.disabled}
                style={{float: "right"}} type="primary" onClick={this._next}>
          Next
        </Button>
      );
    }
    return null;
  }

  submitButton() {
    const currentStep = this.state.currentStep;
    if (currentStep === 6) {
      return (
        <button disabled={this.state.disabled}
          className="btn btn-primary float-right"
          size="lg" type="submit">
          Submit
        </button>
      );
    }
    return null;
  }

  handleSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    /* user.postSurveyResponses = this.state.questions;
    user.timePostStimulusEnd = Date.now();
    user.timeSessionEnd = Date.now();
    user.completed = true;
    this.props.updateUser(user);
    this.setState({
      toFinish: true,
      user: user
    });*/
  };

  getQuestions(idx) {
    var qBank = {
      1: {
        instruction: 'Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:',
        qType: 'Diversity',
        qData: [
          { 'qId': 'q1', 'text': 'All the recommended movies in the final list were similar to each other.', 'flag': false },
          { 'qId': 'q2', 'text': 'None of the movies in the recommended list were alike', 'flag': false },
          { 'qId': 'q3', 'text': 'Most movies were from the same genre', 'flag': false },
          { 'qId': 'q4', 'text': 'The recommended list of movies suits a broad set of tastes', 'flag': false },
          { 'qId': 'q5', 'text': 'The recommended movies were from many different genres', 'flag': false },
          { 'qId': 'q6', 'text': 'The recommendations contained a lot of variety', 'flag': false }
        ] 
      },
      2: {
        instruction: 'Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:',
        qType: 'RecQual',
        qData: [
          { 'qId': 'q1', 'text': 'I liked the movies recommended by the movie recommender', 'flag': false },
          { 'qId': 'q2', 'text': 'I found the recommended movies appealing', 'flag': false },
          { 'qId': 'q3', 'text': 'The recommended movies fit my preference', 'flag': false },
          { 'qId': 'q4', 'text': 'The recommended movies were relevant', 'flag': false },
          { 'qId': 'q5', 'text': 'The system recommended too many bad movies.', 'flag': false },
          { 'qId': 'q6', 'text': 'I did not like any of the recommended movies.', 'flag': false }
        ]
      },
      3: {
        instruction: 'Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:',
        qType: 'choiceSat',
        qData: [
          { 'qId': 'q1', 'text': 'I like the movie I’ve chosen from the final recommendation list.', 'flag': false },
          { 'qId': 'q2', 'text': 'The chosen movie fits my preference.', 'flag': false },
          { 'qId': 'q3', 'text': 'I would recommend my chosen movie to others/friends.', 'flag': false },
          { 'qId': 'q4', 'text': 'I was excited about my chosen movie', 'flag': false },
          { 'qId': 'q5', 'text': 'I think I chose the best movie from the options', 'flag': false },
          { 'qId': 'q6', 'text': 'I know several items that are better than the one I selected', 'flag': false },
          { 'qId': 'q7', 'text': 'I would rather watch a different movie from the one I selected', 'flag': false }
        ] 
      },
      4: {
        instruction: 'Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:',
        qType: 'recConformity',
        qData: [
          { 'qId': 'q1', 'text': 'I feel like I was recommended the same movies as everyone else.', 'flag': false },
          { 'qId': 'q2', 'text': 'The movies that were recommended are very popular movies.', 'flag': false },
          { 'qId': 'q3', 'text': 'I selected the movies that I think are the most popular overall.', 'flag': false },
          { 'qId': 'q4', 'text': 'I selected movies that are rather different from what I imagine others would choose.', 'flag': false },
          { 'qId': 'q5', 'text': 'Probably nobody selected the exact same set of movies as me.', 'flag': false }
        ]
      },
      5: {
        instruction: 'Please rate your agreement with the statements about your <strong> OVERALL </strong> experience with the movie recommender:',
        qType: 'tasteCov',
        qData: [
            { 'qId': 'q1', 'text': 'The movie recommender catered to all of my potential interests', 'flag': false },
            { 'qId': 'q2', 'text': 'The movies that were recommended did not reflect my diverse taste in movies.', 'flag': false },
            { 'qId': 'q3', 'text': 'The movie recommender seemed to target only a small subset of my interests.', 'flag': false },
            { 'qId': 'q4', 'text': 'The movie recommender treated me as a one-dimensional person.', 'flag': false },
            { 'qId': 'q5', 'text': 'The lists of recommendations matched a diversity of my preferences.', 'flag': false },
            { 'qId': 'q6', 'text': 'The recommended movies were a perfect fit for me on many different levels.', 'flag': false },
            { 'qId': 'q7', 'text': 'The movie recommender seemed to stereotype me in a particular category of viewers.', 'flag': false }
          ]
      },
      6: {
        instruction: 'Please rate your agreement with the statements about your <strong> OVERALL </strong> experience with the movie recommender:',
        qType: 'sysSat',
        qData: [
          { 'qId': 'q1', 'text': 'I like using the system.', 'flag': false },
          { 'qId': 'q2', 'text': 'Using the system is a pleasant experience.', 'flag': false },
          { 'qId': 'q3', 'text': 'I would recommend the system to others.', 'flag': false },
          { 'qId': 'q4', 'text': 'I can find better movies using the system.', 'flag': false },
          { 'qId': 'q5', 'text': 'I would quickly abandon using the system.', 'flag': false },
          { 'qId': 'q6', 'text': 'I would use the system more often if possible.', 'flag': false }
        ]
      }
    };

    return qBank[idx];
  };

  render() {

    {/* ###################################################
      Taking this out for now, reinstate once data is connected
    
    const user = this.props.user;
    if (this.state.toFinish === true) {
      return <Redirect to='/exit' />
    }
    }
    */}


    return (
      <React.Fragment>
        <div className="contentWrapper">
          <ProgressBarComponent percentComplete={90} />

          <div className="survey-page">
            <h2>Post-task survey</h2>

            <form id="postSurvey" onSubmit={(evt) => this.handleSubmit(evt)} >
              {[...Array(6)].map((_, i) =>
                {
                  return <StepThrough 
                    key={i+1}
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    stepFlag={i+1}
                    questions_={this.getQuestions(i+1)} />;
                }
              )}
              {/* {this.previousButton()} */}
              {this.nextButton()}
              {this.submitButton()}
              {this.cheatButton()}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


function htmlDecode(input){
  let e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

const likertVals = ['Strongly<br>Disagree', 'Disagree', 'No<br>Opinion', 'Agree', 'Strongly<br>Disagree'];

function StepThrough(props) {
  if (props.currentStep !== props.stepFlag) {
    return null
  }
  let qType = props.questions_.qType;
  let qInstruct = props.questions_.instruction;
  return (
    <React.Fragment>
      <div className="card bg-light mb-3">
        <div className="card-body">
          <h4>Scenario {props.currentStep} out of 6:</h4>
          <p>{ReactHtmlParser(qInstruct)}</p>
          {props.questions_.qData.map((likert, i) => (
            <div className="form-group survey-question" controlid={qType + "_" + i} key={qType + "_" + i} onChange={(evt) => props.handleChange(evt)}>
              <div className="form-row">  
                <label is="legend" className="font-weight-bold"><strong>{ReactHtmlParser(likert.text)}</strong></label>
				<div className="col">
					{likertVals.map((strVal, j) =>
						<label htmlFor={qType + "_" + likert.qId + "-" + j} class="checkboxBtn">
							<p className="checkboxLbl">{ReactHtmlParser(strVal)}</p>
							<input className="radio-margin" type="radio" name={qType + "_" + likert.qId} id={qType + "_" + likert.qId + "-" + j} />
						</label>
					)}
				</div>
                {/* <div className="col"> */}
                  {/* <div className="checkboxgroup custom-control custom-radio"> */}
                    {/* <label htmlFor={qType + "_" + likert.qId + "-1"} class="checkboxBtn">
                      Strongly disagree
                      <input className="radio-margin" type="radio" name={qType + "_" + likert.qId} id={qType + "_" + likert.qId + "-1"} />
                    </label> */}
                  {/* </div> */}

                  {/* <div className="checkboxgroup custom-control custom-radio"> */}
                    {/* <label htmlFor={qType + "_" + likert.qId + "-2"}>
                      Disagree
                      <input className="radio-margin" type="radio" name={qType + "_" + likert.qId} id={qType + "_" + likert.qId + "-2"} />
                    </label> */}
                  {/* </div> */}

                  {/* <div className="checkboxgroup custom-control custom-radio"> */}
                    {/* <label htmlFor={qType + "_" + likert.qId + "-3"}>
                      No Opinion
                      <input className="radio-margin" type="radio" name={qType + "_" + likert.qId} id={qType + "_" + likert.qId + "-3"} />
                    </label> */}
                  {/* </div> */}

                  {/* <div className="checkboxgroup custom-control custom-radio"> */}
                    {/* <label htmlFor={qType + "_" + likert.qId + "-4"}>
                      Agree
                      <input className="radio-margin" type="radio" name={qType + "_" + likert.qId} id={qType + "_" + likert.qId + "-4"} />
                    </label> */}
                  {/* </div> */}

                  {/* <div className="checkboxgroup custom-control custom-radio"> */}
                    {/* <label htmlFor={qType + "_" + likert.qId + "-5"}>
                      Strongly agree
                      <input className="radio-margin" type="radio" name={qType + "_" + likert.qId} id={qType + "_" + likert.qId + "-5"} />
                    </label> */}
                  {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>

      </div>
    </React.Fragment>
  );
}

export default SurveyPage;