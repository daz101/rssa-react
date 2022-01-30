import '../App.css';
import "react-step-progress-bar/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-star-rating/dist/css/react-star-rating.min.css';
import axios from "axios";
import { API, Movie } from "./constants";
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from "react-bootstrap/Jumbotron";
import MovieSidePanel from "./Preferences/movieSidePanel";
import ProgressBarComponent from "./progressBarComponent";
import { Card, CardBody, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";

class Moviecard extends Component {
    constructor(props) {
        super(props);
        this.onChangeMovieId = this.onChangeMovieId.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            leftItems: [],
            rightItems: [],
            leftCondition: '',
            rightCondition: '',
            movies: [],
            mId: "",
            rate: '',
            isHovered: false,
            isActive: false,
            rate2: '',
            isShown: '',
            setIsShown: false,
            activeMovie: null,
        };
        this.handleHover = this.handleHover.bind(this);
    }

    componentDidMount() {
        this.getRecommendations();
    }

    getRecommendations() {
        let userid = this.props.location.state.userid;
        let ratings = this.props.location.state.ratings;
        console.log(userid);
        console.log(ratings);

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
                        leftItems: response.data['recommendations']['left']['items'],
                        rightItems: response.data['recommendations']['right']['items'],
                        leftCondition: response.data['recommendations']['left']['label'],
                        rightCondition: response.data['recommendations']['right']['label']
                    });
                }
            });
    }

    // movieList() {
    //     return this.state.movies.map(currentmovie => {
    //         return (
    //             <Movie movie={currentmovie}
    //                 // deleteMovie={this.deleteMovie}
    //                 key={currentmovie._id}
    //             />
    //         );
    //     });
    // }

    onChangeMovieId(e) {
        this.setState({
            mId: e.target.value
        });
    }

    // onSubmit(e) {
    //     e.preventDefault();

    //     // const exercise = {
    //     //   username: this.state.username,
    //     //   description: this.state.description,
    //     //   duration: this.state.duration,
    //     //   date: this.state.date
    //     // };
    //     axios
    //         .get(API + this.state.mId)
    //         .then(response => {
    //             this.setState({ movies: response.data });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    // handleShow = () => {
    //     console.log('hello');
    //     this.setState({
    //         isActive: true
    //     })
    // };

    // handleHide = () => {
    //     this.setState({
    //         isActive: false
    //     })
    // };

    handleHover(isShown, activeMovie) {
        this.setState(prevState => ({
            setIsShown: isShown,
            activeMovie: activeMovie,
            isHovered: !prevState.isHovered
        }));
    };

    handleRateChange = evt => {
        this.setState({ rate: evt.target.value });
    };

    handleRateChange1 = evt => {
        this.setState({ rate2: evt.target.value });
    };

    // handleSubmit = evt => {
    //     const { rate } = this.state;
    //     const { rate2 } = this.state;
    //     alert(`Signed up with rate: ${rate}`);
    // };

    // canBeSubmitted() {
    //     const { rate } = this.state;
    //     const { rate2 } = this.state;
    //     return rate.length, rate2.length;
    // }

    render() {
        let leftItems = this.state.leftItems;
        let leftCondition = this.state.leftCondition;

        let rightItems = this.state.rightItems;
        let rightCondition = this.state.rightCondition;

        let userid = this.props.location.state.userid;
        // TODO let this be the newrating made on this page
        let ratings = [];

        console.log(userid);
        console.log(leftCondition);
        console.log(leftItems);
        
        console.log(rightCondition);
        console.log(rightItems);

        // const active = this.state.isActive ? "pulse animated" : "";
        // const isEnabled = this.canBeSubmitted();
        // const { rate } = this.state;
        // const { rate2 } = this.state;

        // const ratingChanged = (newRating) => {
        //     console.log(newRating);
        // };

        return (
            <div className="contentWrapper">
                <ProgressBarComponent percentComplete={75} />
                <br />
                <Jumbotron>
                    <p style={{ textAlign: "center" }}>Please rate the following movies.</p>
                </Jumbotron>

                {/* 
                <div style={{ minWidth: "300px", minHeight: "300px" }}>
                <Spinner animation="border" role="status" style={{ margin: "3em 50%", width: "54px", height: "54px" }} />
                </div> */}

                <div className="row padding">
                    <MovieSidePanel movieList={leftItems} handler={this.handleHover}
                        panelTitle={leftCondition} />
                    {this.state.setIsShown && (this.state.activeMovie != null) ? (
                        <div className="col-sm-4 no-gutter">
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
                    <MovieSidePanel movieList={rightItems} handler={this.handleHover}
                        panelTitle={rightCondition} />
                </div>
                <div style={{ marginTop: "1em" }}>
                    <Link to={{
                            pathname: "/movieInfo",
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
        );
    }
}

export default Moviecard;