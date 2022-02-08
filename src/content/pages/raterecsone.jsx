import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";
import 'react-star-rating/dist/css/react-star-rating.min.css';
import "react-step-progress-bar/styles.css";
import { Card, CardBody, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";
import '../../App.css';
import { API } from "../constants";
import MovieSidePanel from "../widgets/movieSidePanel";
import ProgressBarComponent from "../widgets/progressBar";

class RecommendationPageOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftPanel: {items: [], condition: ''},
            rightPanel: {items: [], condition: ''},
            visited: [],
            setIsShown: false,
            activeMovie: null,
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleRating = this.handleRating.bind(this);
    }

    componentDidMount() {
        this.getRecommendations();
    }

    getRecommendations() {
        let userid = this.props.location.state.userid;
        let ratings = this.props.location.state.ratings;
        console.log('getting recs');

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
                    console.log(response.data);
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
        let leftItems = this.state.leftPanel.items;
        let leftCondition = this.state.leftPanel.condition;

        let rightItems = this.state.rightPanel.items;
        let rightCondition = this.state.rightPanel.condition;

        let userid = this.props.location.state.userid;
        let ratings = this.state.visited;

        console.log(userid);

        return (
            <div className="contentWrapper">
                <div style={{margin: "0 3em"}}>
                <ProgressBarComponent percentComplete={75} />
                <br />
                {/* <Jumbotron>
                    <p style={{ textAlign: "center" }}>Please rate the following movies.</p>
                </Jumbotron> */}
                <div className="jumbotron">
                    <p>
                        Please rate the following movies.
                    </p>
                </div>

                {/* 
                <div style={{ minWidth: "300px", minHeight: "300px" }}>
                <Spinner animation="border" role="status" style={{ margin: "3em 50%", width: "54px", height: "54px" }} />
                </div> */}

                <div className="row padding">
                    <MovieSidePanel id="leftPanel" movieList={leftItems} hoverHandler={this.handleHover}
                        ratingHandler={this.handleRating} panelTitle={leftCondition} />
                    {this.state.setIsShown && (this.state.activeMovie != null) ? (
                        <div className="col-sm-4 no-gutter" style={{maxWidth: '480px'}}>
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
                    <MovieSidePanel id="rightPanel" movieList={rightItems} hoverHandler={this.handleHover}
                        ratingHandler={this.handleRating} panelTitle={rightCondition} />
                </div>
                <div style={{ marginTop: "1em" }}>
                    <Link to={{
                            pathname: "/raterecommendations2",
                            state: {
                                userid: userid,
                                ratings: ratings
                            }
                        }}>
                        <Button variant="primary" style={{ float: 'right' }}>
                            Next
                        </Button>
                    </Link>
                </div>
                </div>
            </div>
        );
    }
}

export default RecommendationPageOne;