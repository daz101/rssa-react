import {Link} from "react-router-dom";
import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import {ProgressBar, Step} from "react-step-progress-bar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';
import 'intro.js/introjs.css';
import {Steps} from "intro.js-react";
import MovieGrid from "./movieGrid_test";

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
        intro: "Select a movie that you are familiar with and provide a rating. You can use the slider to the side to find more options."
      },
      {
        element: ".rankHolder",
        intro: "Rate a total of 15 movies to proceed to the next stage. "
      }],
      hintsEnabled: true,
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
    console.log(this.state.count);
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

            <ProgressBar
                percent={50}
                filledBackground="linear-gradient(to right, #fefb72, #f0bb31)">

                <Step transition="scale">
                    {({accomplished}) => (
                        <img
                            style={{marginLeft: 40, filter: `grayscale(${accomplished ? 0 : 100}%)`}}
                            width="30"
                            src="/one.png"
                            alt={1}
                        />
                    )}
                </Step>
                <Step transition="scale">
                    {({accomplished}) => (
                        <img
                            style={{filter: `grayscale(${accomplished ? 0 : 100}%)`}}
                            width="30"
                            src="/two.png"
                            alt={2}
                        />
                    )}
                </Step>
                <Step transition="scale">
                    {({accomplished}) => (
                        <img
                            style={{paddingright: 90, filter: `grayscale(${accomplished ? 0 : 100}%)`}}
                            width="30"
                            src="/three.png"
                            alt={3}
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({accomplished}) => (
                        <img
                            style={{filter: `grayscale(${accomplished ? 0 : 100}%)`}}
                            width="30"
                            src="/four.png"
                            alt={4}
                        />
                    )}
                </Step>

                <Step transition="scale">
                    {({accomplished}) => (
                        <img
                            style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}}
                            width="30"
                            src="/five.png"
                            alt={5}
                        />
                    )}
                </Step>

            </ProgressBar>

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