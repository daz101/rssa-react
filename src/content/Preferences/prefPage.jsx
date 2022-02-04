import { Link } from "react-router-dom";
import React, { Component } from 'react';
import "react-step-progress-bar/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import 'intro.js/introjs.css';
import { Steps } from "intro.js-react";
import MovieGrid from "./movieGrid";
import ProgressBarComponent from "../progressBarComponent";

class PrefPage extends Component {

    moviesRatingCount = 10;

    constructor(props) {
        super(props);
        this.rateMoviesHandler = this.rateMovies.bind(this);

        this.state = {
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: ".test",
                    intro: "Select a movie that you are familiar with and provide a rating. You can use the slider " +
                        "to the side to find more options."
                },
                {
                    element: ".rankHolder",
                    intro: "Rate a total of 15 movies to proceed to the next stage. "
                },
                {
                    element: ".next-button",
                    intro: "Click the Next button to proceed to the next stage."
                }
            ],
            count: 0,
            ratedLst: []
        };
    }

    rateMovies(ratedLst, isNew) {
        this.setState({
            count: isNew ? this.state.count + 1 : this.state.count,
            ratedLst: ratedLst
        });
    }

    render() {
        const {
            stepsEnabled,
            steps,
            initialStep,
        } = this.state;
        let disabled = true;
        if (this.state.count >= this.moviesRatingCount) {
            disabled = false;
        }

        let userid = this.props.location.state.userid;
        console.log(userid);

        let ratings = this.state.ratedLst;

        return (
            <div className="contentWrapper">
                <br />
                <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={this.onExit}
                />
                <ProgressBarComponent percentComplete={50} />
                <br />
                <div className="test">
                    <p> Rate {this.moviesRatingCount} movies from the gallery below.</p>
                </div>
                <div className="row padding">
                    <div className="col-sm movieGrid">
                        <MovieGrid handler={this.rateMoviesHandler} />
                    </div>
                </div>
                <div id="footer-container" style={{ display: "flex"}}>
                    <div className="rankHolder">
                        <span> Ranked Movies: </span>
                        <span><i>{this.state.count}</i></span>
                        <span><i>of {this.moviesRatingCount}</i></span>
                    </div>
                    <div style={{ marginTop: "18px" }}>
                        <Link to={{
                            pathname: "/movies",
                            state: {
                                userid: userid,
                                ratings: ratings
                            }
                        }}>
                            <Button className="next-button" disabled={disabled}
                                variant="primary">
                                Next
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
    };
}

export default PrefPage;