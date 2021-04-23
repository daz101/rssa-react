import React, { Component } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import ProgressBarComponent from "./progressBarComponent";

class ExitPage extends Component {
    
    render() { 
        let completed = this.props.completed;
        let code = this.props.userId;

        return (

        <div>
            <ProgressBarComponent percentComplete={100} />

        <div className="exit-page">
          {completed ? (
            <div>
              <div className="Card">
                <div className="Card-Header">Exit</div>
                <div className="Card-Body">
                  <p>Thank you for completing the survey. <span role="img" aria-label="Smile ">&#128512;</span>. </p>
                  <p>
                      Your Amazon Mechanical Turk code to claim your payment is: <strong>{code}</strong>. Please save
                      this safely so you can claim your payment. We will endevour to validate the codes as soon as
                      possible.
                  </p>
                </div>
              </div>
            </div>
          ) : (
              <div>
                <div className="Card">
                  <div className="Card-Header">Exit</div>
                  <div className="Card-Body">
                    <p>You decided not to participate in the study. Maybe next time <span role="img" aria-label="Smile ">&#128512;</span>. </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

          );
    }
}
 
export default ExitPage;