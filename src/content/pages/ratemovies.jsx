import axios from "axios";
import React, { Component } from 'react';
import { Steps } from "intro.js-react";
import 'intro.js/introjs.css';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { API } from "../utils/constants";
import MovieGrid from "../widgets/movieGrid";

class RatingPage extends Component {

    moviesRatingCount = 10;

    constructor(props) {
        super(props);
        this.rateMoviesHandler = this.rateMovies.bind(this);
        this.hoverTrackingHandler = this.trackHover.bind(this);
        this.actionTrackingHandler = this.updateActionHistory.bind(this);

        this.state = {
            raterDateTime: undefined,
            userid: this.props.location.state.userid,
            pageid: this.props.location.state.pageid + 1,
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: ".jumbotron",
                    intro: "Find a movie that you have watched and rate it on a 5-point scale."
                },
                {
                    element: "#gallery-right-btn",
                    intro: "Click this button to scroll through the gallery of movies.",
                    position: "left"
                },
                {
                    element: ".rankHolder",
                    intro: "You must rate at least " + this.moviesRatingCount + " movies to proceed."
                },
                {
                    element: ".next-button",
                    intro: "Once you have rated enough movies, you can click here to continue."
                }
            ],
            count: 0,
            ratedLst: [],
            updateSuccess: false,
            loading: false
        };
        this.updateSurvey = this.updateSurveyResponse.bind(this);
    }

    componentDidMount() {
        this.setState({
            raterDateTime: new Date()
        });
    }

    updateSurveyResponse() {
        this.setState({
            loading: true
        });

        let raterDateTime = this.state.raterDateTime;
        let raterEndTime = new Date();
        let pageid = this.state.pageid;
        let userid = this.state.userid;
        let ratedLst = this.state.ratedLst;
        let ratingHistory = this.state.ratingHistory;
        let hoverHistory = this.state.hoverHistory;
        let actionHistory = this.state.actionHistory;

        axios.put(API + 'add_survey_response', {
            pageid: pageid,
            userid: userid,
            starttime: raterDateTime.toUTCString(),
            endtime: raterEndTime.toUTCString(),
            response: {
                ratings: ratedLst,
                rating_history: ratingHistory,
                hover_history: hoverHistory,
                action_history: actionHistory
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        updateSuccess: true,
                        loading: false
                    });
                    this.props.progressUpdater(10);
                }
            })
    }

    rateMovies(ratedLst, isNew, ratingHistory) {
        this.setState({
            count: isNew ? this.state.count + 1 : this.state.count,
            ratedLst: ratedLst,
            ratingHistory: ratingHistory
        });
    }

    trackHover(hoverHistory) {
        this.setState({
            hoverHistory: hoverHistory
        });
    }

    onBeforeChange = nextStepIndex => {
        if (nextStepIndex === 1) {
            this.steps.updateStepElement(nextStepIndex);
        }
    }

    updateActionHistory(actionHistory) {
        this.setState({
            actionHistory: actionHistory
        })
    }

    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
    };

    render() {
        let userid = this.state.userid;
        let ratings = this.state.ratedLst;
        let pageid = this.state.pageid;

        if (this.state.updateSuccess) {
            return (
                <Redirect to={{
                    pathname: this.props.dest,
                    state: {
                        userid: userid,
                        ratings: ratings,
                        pageid: pageid
                    }
                }} />
            );
        }

        const {
            stepsEnabled,
            steps,
            initialStep,
        } = this.state;
        let disabled = this.state.count < this.moviesRatingCount;
        let buttonVariant = disabled ? 'secondary' : 'primary';

        return (
            <>
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
                    onBeforeChange={this.onBeforeChange}
                />
                <div className="jumbotron">
                    <h1 className="header">Indicate your preferences</h1>
                    <p>Use the blue button on the right to scroll through
                        the gallery of movies and rate at least 10 movies
                        that you have already watched. Once you have rated 10
                        movies, the system will be able to give you
                        recommendations.
                        Keep in mind, you can click on the blue button on the
                        right to get more movies to rate!</p>
                </div>
                <Container>
                    <MovieGrid ratingHandler={this.rateMoviesHandler} userid={userid} pageid={pageid}
                        hoverHandler={this.hoverTrackingHandler} actionHandler={this.actionTrackingHandler} />
                </Container>
                <div className="jumbotron jumbotron-footer" style={{ display: "flex" }}>
                    <div className="rankHolder">
                        <span> Ranked Movies: </span>
                        <span><i>{this.state.count}</i></span>
                        <span><i>of {this.moviesRatingCount}</i></span>
                    </div>
                    <Button variant={buttonVariant} size="lg" style={{ height: "fit-content", marginTop: "1em" }}
                        className="next-button footer-btn" disabled={disabled && !this.state.loading}
                        onClick={this.updateSurvey}>
                        {!this.state.loading ? 'Next'
                            :
                            <>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </>
                        }
                    </Button>
                </div>
            </>
        );
    }
}

export default RatingPage;