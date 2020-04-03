import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class SurveyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toInstructions: false,
      questions: [],
      disabled: true,
      currentStep: 1
    };
    const user = this.props.user;
    user.acceptTerms = true;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const disabled = !((currentStep === 1 && questions.length === 7) || (currentStep === 2 && questions.length === 9) || (currentStep === 3 && questions.length === 13));
    this.setState({ questions: questions, disabled: disabled });
  }


  /*
  functions to handle next and previous buttons 
  */

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
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
          className="btn btn-secondary"
          type="button" onClick={this._prev}>
          Previous
        </Button>
      );
    }
    return null;
  }

  nextButton() {
    const currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <Button disabled={this.state.disabled}
          className="btn btn-primary float-right"
          type="button" onClick={this._next}>
          Next
        </Button>
      );
    }
    return null;
  }

  submitButton() {
    const currentStep = this.state.currentStep;
    if (currentStep === 3) {
      return (
        <Button disabled={this.state.disabled}
          className="btn btn-primary float-right"
          size="lg" type="submit">
          Submit
        </Button>
      );
    }
    return null;
  }

  handleSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const user = this.props.user;
    user.timePreStimulusEnd = Date.now();
    user.preSurveyResponses = this.state.questions;
    this.props.updateUser(user);
    this.setState({
      toInstructions: true
    });
  };

  render() {
    if (this.state.toInstructions === true) {
      return <Redirect to='/instructions' />
    }

    return (
      <React.Fragment>
        <div>
          <div className="survey-page">
            <h2>Post-task survey</h2>
            <p>Please rate your agreement with the following statements about yourself or your opinions:</p>
            <Form id="preSurvey" onSubmit={(evt) => this.handleSubmit(evt)} >
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                age={this.state.age}
                gender={this.state.gender}
                stage1={this.state.stage1}
              />
              <Step2
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              
              {/* {this.previousButton()} */}
              {this.nextButton()}
              {this.submitButton()}
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  }
  return (
    <React.Fragment>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridAge">
          <Form.Label>Age</Form.Label>
          <Form.Control required as="select" onChange={(evt) => props.handleChange(evt)}>
            <option>Choose...</option>
            <option>18 - 24 years old </option>
            <option>25 - 29 years old </option>
            <option>30 - 34 years old </option>
            <option>35 - 39 years old </option>
            <option>40 - 44 years old </option>
            <option>45 - 49 years old </option>
            <option>50 - 54 years old </option>
            <option>55+ </option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control required as="select" onChange={(evt) => props.handleChange(evt)}>
            <option>Choose...</option>
            <option>Woman</option>
            <option>Man</option>
            <option>Non-binary </option>
            <option>Prefer not to disclose</option>
            {/*<option>Prefer to self-describe </option>*/}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Card>
        <Card.Body>
          <p>Please answer the following questions as accurately as possible. </p>
          {[
            { 'qId': 'q1', 'text': 'My typical approach is to trust new technology' },
            { 'qId': 'q2', 'text': 'I generally trust new technology until they give me a reason not to' },
            { 'qId': 'q3', 'text': 'Even under doubt I will choose to trust new technology' },
            { 'qId': 'q4', 'text': 'It is easy for me to trust new technology' },
            { 'qId': 'q5', 'text': 'My tendency to trust new technology is high' }
          ].map((likert, i) => (

            <Form.Group controlId="DispositionToTrust" key={"DispositionToTrust_" + i} onChange={(evt) => props.handleChange(evt)}>

              <Form.Row>
                <Form.Label as="legend" column sm="3" className="font-weight-bold">{likert.text}</Form.Label>
                <Col>
                  <Form.Check type="radio" inline label="Strongly disagree" name={"DispositionToTrust_" + likert.qId} id={"DispositionToTrust_" + likert.qId + "-1"} />
                  <Form.Check type="radio" inline label="Disagree" name={"DispositionToTrust_" + likert.qId} id={"DispositionToTrust_" + likert.qId + "-2"} />
                  <Form.Check type="radio" inline label="Neither agree nor disagree" name={"DispositionToTrust_" + likert.qId} id={"DispositionToTrust_" + likert.qId + "-3"} />
                  <Form.Check type="radio" inline label="Agree" name={"DispositionToTrust_" + likert.qId} id={"DispositionToTrust_" + likert.qId + "-4"} />
                  <Form.Check type="radio" inline label="Strongly agree" name={"DispositionToTrust_" + likert.qId} id={"DispositionToTrust_" + likert.qId + "-5"} />
                </Col>

              </Form.Row>
            </Form.Group>
          ))}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  }
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          {[
            { 'qId': 'q1', 'text': 'I like chatting casually with a chatbot' },
            { 'qId': 'q2', 'text': 'I think ‘small talk’ with a chatbot is enjoyable.' }
          ].map((likert, i) => (
            <Form.Group controlId="SocialPres" key={"SocialPres" + i} onChange={(evt) => props.handleChange(evt)}>
              <Form.Row>
                <Form.Label as="legend" column sm="3" className="font-weight-bold">{likert.text}</Form.Label>
                <Col>
                  <Form.Check type="radio" inline label="Strongly disagree" name={"SocialPres_" + likert.qId} id={"SocialPres_" + likert.qId + "-1"} />
                  <Form.Check type="radio" inline label="Disagree" name={"SocialPres_" + likert.qId} id={"SocialPres_" + likert.qId + "-2"} />
                  <Form.Check type="radio" inline label="Neither agree nor disagree" name={"SocialPres_" + likert.qId} id={"SocialPres_" + likert.qId + "-3"} />
                  <Form.Check type="radio" inline label="Agree" name={"SocialPres_" + likert.qId} id={"SocialPres_" + likert.qId + "-4"} />
                  <Form.Check type="radio" inline label="Strongly agree" name={"SocialPres_" + likert.qId} id={"SocialPres_" + likert.qId + "-5"} />
                </Col>
              </Form.Row>
            </Form.Group>
          ))}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  }
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          {[
            { 'qId': 'q1', 'text': 'I like to occupy myself in greater detail with technical systems.' },
            { 'qId': 'q2', 'text': 'I like testing the functions of new technical systems.' },
            { 'qId': 'q4', 'text': 'When I have a new technical system in front of me, I try it out intensively.' },
            { 'qId': 'q5', 'text': 'I enjoy spending time becoming acquainted with a new technical system.' }
          ].map((likert, i) => (
            <Form.Group controlId="TechnologyExperience1" key={"TechnologyExperience1_" + i} onChange={(evt) => props.handleChange(evt)}>
              <Form.Row>
                <Form.Label as="legend" column sm="3" className="font-weight-bold">{likert.text}</Form.Label>
                <Col>
                  <Form.Check type="radio" inline label="Strongly disagree" name={"TechnologyExperience1_" + likert.qId} id={"TechnologyExperience1_" + likert.qId + "-1"} />
                  <Form.Check type="radio" inline label="Disagree" name={"TechnologyExperience1_" + likert.qId} id={"TechnologyExperience1_" + likert.qId + "-2"} />
                  <Form.Check type="radio" inline label="Neither agree nor disagree" name={"TechnologyExperience1_" + likert.qId} id={"TechnologyExperience1_" + likert.qId + "-3"} />
                  <Form.Check type="radio" inline label="Agree" name={"TechnologyExperience1_" + likert.qId} id={"TechnologyExperience1_" + likert.qId + "-4"} />
                  <Form.Check type="radio" inline label="Strongly agree" name={"TechnologyExperience1_" + likert.qId} id={"TechnologyExperience1_" + likert.qId + "-5"} />
                </Col>
              </Form.Row>
            </Form.Group>
          ))}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default SurveyPage;
