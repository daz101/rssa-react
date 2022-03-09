import 'intro.js/introjs.css';
import { Redirect } from "react-router-dom";
import React, { Component } from 'react';
import { Steps } from "intro.js-react";
import MovieGrid from "../widgets/movieGrid";
import { API } from "../utils/constants";
import axios from "axios";
import { Container, Button } from 'react-bootstrap';
import { withMousePositionHook } from '../hooks/useMousePosition';

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
                    intro: "Rate a total of " + this.moviesRatingCount + " movies to proceed to the next stage. "
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

    render() {
        let userid = this.state.userid;
        let ratings = this.state.ratedLst;
        let pageid = this.state.pageid;

		const mousePos = this.props.mousePositionHook;
		const pageHeight = document.body.scrollHeight;
		const pageWidth = document.body.scrollWidth;

        if (this.state.updateSuccess) {
            this.props.activitySync(mousePos, pageHeight, pageWidth, userid, pageid);
            return (
                <Redirect to={{
                    pathname: "/raterecommendations1",
                    state: {
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
                />
                <div className="jumbotron">
                    <h1 className="header">Rating Movies</h1>
                    <p> Rate {this.moviesRatingCount} movies that <strong>you already watched</strong> from the gallery below.</p>
                </div>
                <Container>
                    <MovieGrid handler={this.rateMoviesHandler} />
                </Container>
                <div className="jumbotron jumbotron-footer" style={{display: "flex"}}>
                    <div className="rankHolder">
                        <span> Ranked Movies: </span>
                        <span><i>{this.state.count}</i></span>
                        <span><i>of {this.moviesRatingCount}</i></span>
                    </div>
                        <Button variant={buttonVariant} size="lg" style={{height: "fit-content", marginTop: "1em"}} 
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

export default withMousePositionHook(RatingPage);