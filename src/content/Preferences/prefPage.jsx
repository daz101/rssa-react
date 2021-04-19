import {Link} from "react-router-dom";
import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';
import 'intro.js/introjs.css';
import {Steps} from "intro.js-react";
import MovieGrid from "./movieGrid";
import ProgressBarComponent from "../progressBarComponent";

class PrefPage extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);

        this.state = {
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: ".row",
                    intro: "Select a movie that you are familiar with and provide a rating. You can use the slider " +
                        "to the side to find more options."
                },
                {
                    element: ".rankHolder",
                    intro: "Rate a total of 15 movies to proceed to the next stage. "
                }],
            hintsEnabled: false,
            hints: [
                {
                    element: ".container",
                    hint: "Hello hint",
                    hintPosition: "middle-right"
                }],
            count: 0
        };
  }

  handler(){
        let currentCount = this.state.count;
        currentCount += 1;
        this.setState({
            count: currentCount
        });
  }
  
  render() {
        const {
            stepsEnabled,
            steps,
            initialStep,
            hintsEnabled,
            hints
        } = this.state;
        let disabled = true;
        if (this.state.count >= 15){
            disabled = false;
    }

    return (
        <div>
            <br/>
            <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={initialStep}
                onExit={this.onExit}
            />
            <ProgressBarComponent percentComplete={50} />
            <br/>
            <div className="row padding">
                <div className="col-sm">
                    <MovieGrid handler={this.handler}/>
                </div>
            </div>

            <div id="footer-container">
                <div className="rankHolder">
                    <span> Ranked Movies: </span>
                    <span id="NumberOfRankedMovies"><i>{this.state.count}</i></span>
                    <span><i>of 15</i></span>
                </div>
                <Link to="/movies">
                    <Button disabled={disabled} variant="primary" style={{float:'right', marginRight: 90}}>Next</Button>
                </Link>
            </div>
        </div>
    );
    }

      onExit = () => {
        this.setState(() => ({stepsEnabled: false}));
    };
}

export default PrefPage;