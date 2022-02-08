import 'intro.js/introjs.css';
import "react-step-progress-bar/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from "react-router-dom";
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Steps } from "intro.js-react";
import MovieGrid from "../widgets/movieGrid";
import ProgressBarComponent from "../widgets/progressBar";
import {API} from "../constants";
import axios from "axios";

class RatingPage extends Component {

    moviesRatingCount = 10;

    constructor(props) {
        super(props);
        this.rateMoviesHandler = this.rateMovies.bind(this);

        this.state = {
            raterDateTime: undefined,
            userid: this.props.location.state.userid,
            pageid: 4,
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: ".jumbotron",
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
            ratedLst: [],
            updateSuccess: false
        };
        this.updateSurvey = this.updateSurveyResponse.bind(this);
    }

    componentDidMount() {
        this.setState({
            raterDateTime: new Date()
        });
    }

    updateSurveyResponse() {
        let raterDateTime = this.state.raterDateTime;
        let raterEndTime = new Date();
        let pageid = this.state.pageid;
        let userid = this.state.userid;
        let ratedLst = this.state.ratedLst;

        axios.put(API + 'add_survey_response', {
            pageid: pageid,
            userid: userid,
            starttime: raterDateTime.toUTCString(),
            endtime: raterEndTime.toUTCString(),
            response: {ratings: ratedLst}
        })
        .then(response => {
            if (response.status === 200) {
                this.setState({
                    updateSuccess: true
                });
            }
        })
    }

    rateMovies(ratedLst, isNew) {
        this.setState({
            count: isNew ? this.state.count + 1 : this.state.count,
            ratedLst: ratedLst
        });
    }

    render() {
        let userid = this.state.userid;
        let ratings = this.state.ratedLst;
        if (this.state.updateSuccess){
            return (
                <Redirect to={{
                    pathname: "/raterecommendations1",
                    state:{
                        userid: userid,
                        ratings: ratings
                    }
                }} />
            );
        }

        const {
            stepsEnabled,
            steps,
            initialStep,
        } = this.state;
        let disabled = true;
        if (this.state.count >= this.moviesRatingCount) {
            disabled = false;
        }

        return (
            <div className="contentWrapper">
                <div style={{ margin: "0 3em" }}>
                    <br />
                    <Steps
                        enabled={stepsEnabled}
                        steps={steps}
                        initialStep={initialStep}
                        onExit={this.onExit}
                        options={{
                            showStepNumbers: true,
                            scrollToElement: true,
                            hideNext: false,
                            nextToDone: true
                        }}
                        ref={steps => (this.steps = steps)}
                    />
                    <ProgressBarComponent percentComplete={50} />
                    <br />
                    <div className="jumbotron">
                        <p> Rate {this.moviesRatingCount} movies from the gallery below.</p>
                    </div>
                    <MovieGrid handler={this.rateMoviesHandler} />
                    <div id="footer-container" style={{ display: "flex" }}>
                        <div className="rankHolder">
                            <span> Ranked Movies: </span>
                            <span><i>{this.state.count}</i></span>
                            <span><i>of {this.moviesRatingCount}</i></span>
                        </div>
                        <div style={{ marginTop: "18px" }}>
                            {/* <Link to={{
                                pathname: "/raterecommendations1",
                                state: {
                                    userid: userid,
                                    ratings: ratings
                                }
                            }}> */}
                                <Button className="next-button" disabled={disabled}
                                    variant="primary" onClick={this.updateSurvey}>
                                    Next
                                </Button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
    };
}

export default RatingPage;