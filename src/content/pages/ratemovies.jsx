import axios from "axios";
import { Steps } from "intro.js-react";
import 'intro.js/introjs.css';
import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { API } from "../utils/constants";
import MovieGrid from "../widgets/movieGrid";

class RatingPage extends Component {

    moviesRatingCount = 10;

    constructor(props) {
        super(props);
        this.rateMoviesHandler = this.rateMovies.bind(this);

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
            response: { ratings: ratedLst }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        updateSuccess: true
                    });
                    this.props.progressUpdater(10);
                }
            })
    }

    rateMovies(ratedLst, isNew) {
        this.setState({
            count: isNew ? this.state.count + 1 : this.state.count,
            ratedLst: ratedLst
        });
    }

    onBeforeChange = nextStepIndex => {
        if (nextStepIndex === 1) {
            this.steps.updateStepElement(nextStepIndex);
        }
    }

    render() {
        let userid = this.state.userid;
        let ratings = this.state.ratedLst;
        let pageid = this.state.pageid;

        if (this.state.updateSuccess) {
            return (
                <Redirect to={{
                    pathname: "/raterecommendations1",
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
                        that you have already watched</p>
                </div>
                <Container>
                    <MovieGrid handler={this.rateMoviesHandler} userid={userid} pageid={pageid} />
                </Container>
                <div className="jumbotron jumbotron-footer" style={{ display: "flex" }}>
                    <div className="rankHolder">
                        <span> Ranked Movies: </span>
                        <span><i>{this.state.count}</i></span>
                        <span><i>of {this.moviesRatingCount}</i></span>
                    </div>
                    <Button variant={buttonVariant} size="lg" style={{ height: "fit-content", marginTop: "1em" }}
                        className="next-button footer-btn" disabled={disabled}
                        onClick={this.updateSurvey}>
                        Next
                    </Button>
                </div>
            </>
        );
    }

    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
    };
}

export default RatingPage;