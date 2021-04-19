import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Jumbotron from "react-bootstrap/Jumbotron";
import {Link} from "react-router-dom";
import "react-step-progress-bar/styles.css";
import ProgressBarComponent from "./progressBarComponent";

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      disabled: true,
    };
  }

  render() {
    const show = this.state.show;

    return (
      <div>
        <ProgressBarComponent percentComplete={5}/>
        <Jumbotron>
          <h1 className="header">Welcome</h1>
          <p>Welcome to the study on movie recommendation</p>
        </Jumbotron>
        <Card bg="light">
          <Card.Body>
            <Card.Title>What can you expect?</Card.Title>
            <p>
              Dr. Knijnenburg invites you to take part in a research study. Dr. Knijnenburg is a professor at Clemson
              University. This is a study that aims to test a new recommender system for movies. Your participation in
              this study will be valued.
            </p>
            <p>
              It will take you about 10-15 minutes to complete the four steps of the study:
            </p>
            <ol>
              <li>Introduction</li>
              <li>Instructions for the study</li>
              <li>Interact with movie recommender</li>
              <li>Complete survey describing your experience</li>
            </ol>

            <p>
              After completing the study, you will be given a special code at the end of the study to facilitate
              payment of $2.00. You will need to go back to MTurk to put in that code. You should keep the MTurk page
              with the HIT open.</p>
            <br/>

            <p>Thanks,<br/>
              Research Team</p>
            <Button variant="primary" size="lg"
                    onClick={() => this.setState({"show": true})}>
              Get started
            </Button>
          </Card.Body>
        </Card>
        <Modal show={show} dialogClassName="modal-70w" >
          <Modal.Header>
            <Modal.Title>Consent: taking part in the study</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Risks and discomforts</strong></p>
            <p>
              We do not know of any risks or discomforts to you participating in this research study. However, if you
              feel that you need a break, then you may take one at any time. You may also opt out of the study at any
              time if you are not comfortable.
            </p>

            <p><strong>Incentives</strong></p>
            <p>
              As a result of your completion of this study, you will be compensated $2.00 through Amazon Mechanical
              Turk. We appreciate your participation and feedback from this study.
            </p>

            <p><strong>Confidentiality</strong></p>
            <p>
              To protect your confidentiality, a randomly-assigned numeric identifier will be used to identify you and
              your data from this study. Data collected from the study (interaction and questionnaire responses) will
              only be accessible to the investigator(s) and members of the research team. Data will be analyzed in an
              anonymous form and you would not be identified by personal information.
            </p>
            <p>
              Your participation in this study is voluntary. You may refuse to take part in this study or end your
              participation (withdraw consent and discontinue participation) in this study at any time without risk,
              penalty, or loss of benefits that you are otherwise entitled to receive.
              If you would like to withdraw the data you provided, you can contact the experimenter by email:
              clemsonhatlab@gmail.com
            </p>

            <p><strong>Consent</strong></p>
            <Form.Check
                label="I have read and understand this study and my rights above. My participation in this
                            study is voluntary. I voluntarily agree to participate in this research study."
                onChange={(evt) => this.setState({disabled: !evt.target.checked})}/>

          </Modal.Body>
          <Modal.Footer>
            <Link to="/exit">
              <Button variant="secondary">
                Exit
              </Button>
            </Link>
            <Link to="/inst">
              <Button variant="primary" disabled={this.state.disabled}>
                Continue
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Welcome;