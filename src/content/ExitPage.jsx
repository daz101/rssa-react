import React, { Component } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

class ExitPage extends Component {
    
    render() { 
        const completed = this.props.user.completed;
        const code = this.props.user.userId;

        return (

        <div>
<ProgressBar
percent={100}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"> 

<Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginLeft:40, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="30"
              src="/one.png"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="30"
              src="/two.png"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ paddingright:90, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="30"
              src="/three.png"
            />
          )}
        </Step>

        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="30"
              src="/four.png"
            />
          )}
        </Step>

        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginRight:40, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="30"
              src="/five.png"
            />
          )}
        </Step>

  </ProgressBar>

        <div className="exit-page">
          {completed ? (
            <div>
              <div className="Card">
                <div className="Card-Header">Exit</div>
                <div className="Card-Body">
                  <p>Thank you for completing the survey. <span role="img" aria-label="Smile ">&#128512;</span>. </p>
                  <p>Your Amazon Mechanical Turk code to claim your payment is: <strong>{code}</strong>. Please save this safely so you can claim your payment. We will endevour to validate the codes as soon as possible. </p>
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