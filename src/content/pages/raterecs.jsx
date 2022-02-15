import axios from "axios";
import React, { Component } from 'react';
import { API } from "../utils/constants";
import MovieSidePanel from "../widgets/movieSidePanel";
import { Redirect } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import LoadingAnimation from '../widgets/loadingView';

class RecommendationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            leftPanel: { items: [], condition: '' },
            rightPanel: { items: [], condition: '' },
            visited: [],
            setIsShown: false,
            activeMovie: null,
            recDateTime: new Date(),
            pageid: 5,
            ratings: this.props.location.state.ratings,
            userid: this.props.location.state.userid,
            updateSuccess: false,
            selectedid: undefined
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
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

    async startTimer() {
        await this.wait(10000);
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
            response: { ratings: ratedLst }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        updateSuccess: true
                    });
                }
                this.props.progressUpdater(10);
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

    handleSelect(movieid) {
        this.setState({
            selectedid: movieid
        });
    }

    render() {
        let pick = this.props.pick || false;
        let selectedid = this.state.selectedid;

        let userid = this.state.userid;
        let ratings = this.state.visited.concat(this.state.ratings);

        if (this.state.updateSuccess) {
            return (
                <Redirect to={{
                    pathname: this.props.dest,
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
            <>
                <div className="jumbotron">
                    <h1 className="header">{this.props.pageHeader}</h1>
                    <p>{this.props.headerSubtitle}
                    </p>
                </div>

                <div className="row g-0">
                    <MovieSidePanel id="leftPanel" movieList={leftItems} hoverHandler={this.handleHover}
                        ratingHandler={this.handleRating} panelTitle={leftCondition} pick={pick}
                        selectionHandler={this.handleSelect} selectedid={selectedid} />
                    {this.state.setIsShown && (this.state.activeMovie != null) ? (
                        <div className="col-sm-4 gx-sm-4">
                            <Card bg="dark" text="white" style={{
                                backgroundColor: '#333', borderColor: '#333'
                            }}>
                                <Card.Body style={{ height: '648px' }}>
                                    <Card.Img variant="top" className="d-flex mx-auto d-block img-thumbnail" src={this.state.activeMovie.poster} alt={"Poster of the movie " +
                                        this.state.activeMovie.title} style={{ maxHeight: "63%", minHeight: "63%", width: "auto" }} />
                                    <Card.Title style={{ marginTop: "0.5rem" }}>
                                        {this.state.activeMovie.title}
                                    </Card.Title>
                                    <Container className="overflow-auto" style={{ height: "30%" }}>
                                        <Card.Text>
                                            {this.state.activeMovie.description}
                                        </Card.Text>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    ) : (<div className="col-sm-4 gx-sm-4" />)
                    }
                    <MovieSidePanel id="rightPanel" movieList={rightItems} hoverHandler={this.handleHover}
                        ratingHandler={this.handleRating} panelTitle={rightCondition} pick={pick}
                        selectionHandler={this.handleSelect} selectedid={selectedid} />
                </div>
                <div className="jumbotron jumbotron-footer">
                    <Button className="footer-btn" variant="primary" size="lg"
                        onClick={this.updateSurvey}>
                        Next
                    </Button>
                </div>
            </>
        ) :
            (
                <>
                    <LoadingAnimation waitMsg={this.props.waitMsg}></LoadingAnimation>
                </>
            );
    }
}

export default RecommendationPage;