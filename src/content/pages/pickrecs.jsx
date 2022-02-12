import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from "react-router-dom";
import 'react-star-rating/dist/css/react-star-rating.min.css';
import "react-step-progress-bar/styles.css";
import { Card, CardBody, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";
import '../../App.css';
import { API } from "../utils/constants";
import MoviePickSidePanel from "../widgets/moviePickSidePanel";
import ProgressBarComponent from "../widgets/progressBar";

class RecommendationPageThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recDateTime: new Date(),
            leftPanel: { items: [], condition: '' },
            rightPanel: { items: [], condition: '' },
            setIsShown: false,
            activeMovie: null,
            pageid: 7,
            ratings: this.props.location.state.ratings,
            userid: this.props.location.state.userid,
            updateSuccess: false,
            selectedid: undefined
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.updateSurvey = this.updateSurveyResponse.bind(this);
    }

    componentDidMount() {
        this.getRecommendations();
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

    updateSurveyResponse() {
        let recDateTime = this.state.recDateTime;
        let recEndTime = new Date();
        let pageid = this.state.pageid;
        let userid = this.state.userid;
        let selectedItm = this.state.selectedid;

        axios.put(API + 'add_survey_response', {
            pageid: pageid,
            userid: userid,
            starttime: recDateTime.toUTCString(),
            endtime: recEndTime.toUTCString(),
            response: { pick: selectedItm }
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

    handleSelect(movieid) {
        this.setState({
            selectedid: movieid
        });
    }

    render() {
        let userid = this.state.userid;
        let selectedid = this.state.selectedid;

        if (this.state.updateSuccess) {
            return (
                <Redirect to={{
                    pathname: "/survey",
                    state: {
                        userid: userid,
                        movieid: selectedid
                    }
                }} />
            );
        }

        let leftItems = this.state.leftPanel.items;
        let leftCondition = this.state.leftPanel.condition;

        let rightItems = this.state.rightPanel.items;
        let rightCondition = this.state.rightPanel.condition;

        return (
            // <div className="contentWrapper">
            //     <div style={{ margin: "0 3em" }}>
            //         <ProgressBarComponent percentComplete={75} />
            //         <br />
            <>
                    <div className="jumbotron">
                        <p style={{ textAlign: "center" }}>Please pick ONE movie that you would watch right now if you could.</p>
                    </div>

                    <div className="row padding">
                        <MoviePickSidePanel id="leftPanel" movieList={leftItems} hoverHandler={this.handleHover}
                            selectionHandler={this.handleSelect} panelTitle={leftCondition} selectedid={selectedid} />
                        {this.state.setIsShown && (this.state.activeMovie != null) ? (
                            <div className="col-sm-4 no-gutter" style={{ maxWidth: "480px" }}>
                                <Card inverse style={{
                                    backgroundColor: '#333', borderColor: '#333', maxHeight: '810px'
                                }}>
                                    <CardHeader style={{ height: '594px', alignSelf: 'center' }}>
                                        <CardImg top src={this.state.activeMovie.poster} alt="Card image cap"
                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'initial' }} />
                                    </CardHeader>
                                    <CardBody style={{ height: '216px' }}>
                                        <CardTitle style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                                            {this.state.activeMovie.title}
                                        </CardTitle>
                                        <CardText>
                                            {this.state.activeMovie.description}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        ) : (<div className="col-sm-4" />)
                        }
                        <MoviePickSidePanel id="rightPanel" movieList={rightItems} hoverHandler={this.handleHover}
                            selectionHandler={this.handleSelect} panelTitle={rightCondition} selectedid={selectedid} />
                    </div>
                    <div style={{ marginTop: "1em" }}>
                        <Button variant="primary" style={{ float: 'right' }} onClick={this.updateSurvey}>
                            Next
                        </Button>
                    </div>
            {/* //      </div>
            //  </div> */}
            </>
        );
    }
}

export default RecommendationPageThree;