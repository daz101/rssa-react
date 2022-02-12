import '../../App.css';
import axios from "axios";
import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
// import { Button } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-star-rating/dist/css/react-star-rating.min.css';
import "react-step-progress-bar/styles.css";
import { API } from "../utils/constants";
import MovieSidePanel from "../widgets/movieSidePanel";
import ProgressBarComponent from "../widgets/progressBar";
import { Redirect } from "react-router-dom";
import {Container, Card, Button} from "react-bootstrap";
import LoadingAnimation from '../widgets/loadingView';
// import { Card, CardBody, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";

class RecommendationPageOne extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
            ready: false,
            leftPanel: {items: [], condition: ''},
            rightPanel: {items: [], condition: ''},
            visited: [],
            setIsShown: false,
            activeMovie: null,
            recDateTime: new Date(),
            pageid: 5,
            ratings: this.props.location.state.ratings,
            userid: this.props.location.state.userid,
            updateSuccess: false
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.updateSurvey = this.updateSurveyResponse.bind(this);
    }

    componentDidMount() {
        this.props.toggleLoader(true);
        this.getRecommendations();
        this.startTimer();
    }

    getRecommendations() {
        let userid = this.state.userid;
        let ratings = this.state.ratings;

        axios.post(API + 'recommendations', {
            userid: userid,
            ratings: ratings
        },
            {
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*'
                }

            })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        leftPanel: {
                            condition: response.data['recommendations']['left']['label'],
                            items: response.data['recommendations']['left']['items'],
                        },
                        rightPanel: {
                            items: response.data['recommendations']['right']['items'],
                            condition: response.data['recommendations']['right']['label']
                        }
                    });
                }
            });
    }

    async startTimer () {
        await this.wait(10000);
        console.log('wait is over');
        this.setState({
            ready: true
        });
        this.props.toggleLoader(false);
    }

    wait(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }

    updateSurveyResponse() {
        let recDateTime = this.state.recDateTime;
        let recEndTime = new Date();
        let pageid = this.state.pageid;
        let userid = this.state.userid;
        let ratedLst = this.state.visited;

        axios.put(API + 'add_survey_response', {
            pageid: pageid,
            userid: userid,
            starttime: recDateTime.toUTCString(),
            endtime: recEndTime.toUTCString(),
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

    handleHover(isShown, activeMovie) {
        this.setState({
            setIsShown: isShown,
            activeMovie: activeMovie
        });
    }

    handleRating(panelid, newRating, movieid) {
        let panel = this.state[panelid];
        let movieLst = [...panel.items];
		let vstdLst = [...this.state.visited];
		let ratedItm = movieLst.map(movie => (
			movie.movie_id === movieid ? {
				...movie, rating: newRating
			} : movie
		));
		let isNew = !vstdLst.some(item => item.item_id === movieid);
		if (isNew) {
			vstdLst.push({ "item_id": movieid, "rating": newRating });
		} else {
			vstdLst = vstdLst.map(movie => (
				movie.item_id === movieid ? {
					...movie, rating: newRating
				} : movie
			));
		}
        panel.items = ratedItm;
		this.setState({
			panelid: panel,
			visited: vstdLst
		});
    }

    render() {
        let userid = this.state.userid;
        let ratings = this.state.visited.concat(this.state.ratings);

        if (this.state.updateSuccess){
            return (
                <Redirect to={{
                    pathname: "/raterecommendations2",
                    state: {
                        userid: userid,
                        ratings: ratings
                    }
                }} />
            );
        }

        let leftItems = this.state.leftPanel.items;
        let leftCondition = this.state.leftPanel.condition;

        let rightItems = this.state.rightPanel.items;
        let rightCondition = this.state.rightPanel.condition;


            return this.state.ready ? (
                // <div className="contentWrapper">
                //     <div style={{margin: "0 3em"}}>
                //     <ProgressBarComponent percentComplete={75} />
                //     <br />

                <>
                    <div className="jumbotron">
                        <h1 className="header">Rating Recommendations</h1>
                        <p>
                            Please rate the following recommendations.
                        </p>
                    </div>

                    <div className="row">
                        <MovieSidePanel id="leftPanel" movieList={leftItems} hoverHandler={this.handleHover}
                            ratingHandler={this.handleRating} panelTitle={leftCondition} />
                        {this.state.setIsShown && (this.state.activeMovie != null) ? (
                            <div className="col-sm-4 no-gutter" style={{maxWidth: '480px'}}>
                                <Card bg="dark" text="white" style={{
                                    backgroundColor: '#333', borderColor: '#333', maxHeight: '810px'
                                }}>
                                    <Card.Header style={{ height: '594px', alignSelf: 'center' }}>
                                        <Card.Img src={this.state.activeMovie.poster} alt="Card image cap"
                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'initial' }} />
                                    </Card.Header>
                                    <Card.Body style={{ height: '216px' }}>
                                        <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                                            {this.state.activeMovie.title}
                                        </Card.Title>
                                        <Card.Text>
                                            {this.state.activeMovie.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ) : (<div className="col-sm-4" />)
                        }
                        <MovieSidePanel id="rightPanel" movieList={rightItems} hoverHandler={this.handleHover}
                            ratingHandler={this.handleRating} panelTitle={rightCondition} />
                    </div>
                    <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                        <Button variant="primary" size="lg" style={{ float: 'right' }} onClick={this.updateSurvey}>
                            Next
                        </Button>
                    </div>
                    {/* </div>
                </div> */}
                </>
            ) :
             (
                <>
                    <LoadingAnimation></LoadingAnimation>
                </>
            );
    }
}

export default RecommendationPageOne;