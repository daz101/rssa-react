import axios from "axios";
import React, { Component } from 'react';
import { Button, Card, Container, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { Navigate, Redirect } from "react-router-dom";
import { API } from "../utils/constants";
import LoadingAnimation from '../widgets/loadingView';
import MovieSidePanel from "../widgets/movieSidePanel";
import SidePanelItem from "../widgets/movieSidePanelItem";
import { Steps } from "intro.js-react";
import 'intro.js/introjs.css';
import EmotionToggle from "../widgets/emotionToggle";
import EmotionStats from "../widgets/emoStats";
import withRouter from "../hooks/withRouter";
import EmotionSlider from "../widgets/emotionslider";


class EmotionPref extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            movies: [],
            visited: [],
            ratingHistory: [],
            setIsShown: false,
            activeMovie: null,
            pick: this.props.pick || false,
            recDateTime: new Date(),
            pageid: this.props.router.location.state.pageid + 1,
            ratings: this.props.router.location.state.ratings,
            userid: this.props.router.location.state.userid,
            updateSuccess: false,
            selection: {},
            hoverHistory: [],
            loading: false,
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: ".jumbotron",
                    intro: this.props.headerSubtitle
                },
                {
                    element: "#leftPanel",
                    intro: "These are your movie recommendations.",
                    position: "right"
                },
                {
                    element: "#rightPanel",
                    intro: "This list contains movies based on a different criterion.",
                    position: "left"
                },
                {
                    element: "#moviePosterPreview",
                    intro: "You can hover over movies to see a preview of the poster and a short synopsis."
                },
                {
                    element: '.next-button',
                    intro: this.props.finalhint
                }
            ],
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.updateSurvey = this.updateSurveyResponse.bind(this);
        this.sortmovies = this.sortmovies.bind(this);
    }

    componentDidMount() {
        this.props.toggleLoader(true);
        this.getRecommendations();
        this.startTimer();
        if (this.state.pick) {
            document.body.style.backgroundColor = "blanchedalmond";
        }
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = "white";
    }

    getRecommendations() {
        let userid = this.state.userid;
        let ratings = this.state.ratings;

        axios.post(API + 'ersrecommendations', {
            userid: userid,
            ratings: ratings,
            count: 100
        },
            {
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    this.setState({
                        movies: response.data['recommendations']
                    });
                }
            });
    }

    sortmovies(emotion) {
        let movies = this.state.movies;
        // console.log(movies.slice(0, 10));
        movies.sort((a, b) => {
            if(emotion === "anger"){
                return b.anger > a.anger;
            } else {
                return b.joy > a.joy;
            }
        }
        );
        // console.log(movies.slice(0, 10));
        // console.log('this');
        this.setState({
            movies: movies
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
        this.setState({
            loading: true
        });

        let recDateTime = this.state.recDateTime;
        let recEndTime = new Date();
        let pageid = this.state.pageid;
        let userid = this.state.userid;
        let ratedLst = this.state.visited;
        let hoverHistory = this.state.hoverHistory;
        let ratingHistory = this.state.ratingHistory;

        axios.put(API + 'add_survey_response', {
            pageid: pageid,
            userid: userid,
            starttime: recDateTime.toUTCString(),
            endtime: recEndTime.toUTCString(),
            response: {
                ratings: ratedLst,
                rating_history: ratingHistory,
                hover_history: hoverHistory
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        updateSuccess: true,
                        loading: false
                    });
                }
                this.props.progressUpdater(10);
            })
    }

    handleHover(isShown, activeMovie, action, panelid) {
        let history = [...this.state.hoverHistory];
        history.push({
            'item_id': activeMovie.movie_id,
            time: new Date().toUTCString(),
            action: action,
            loc: panelid,
            level: this.props.level

        });
        this.setState({
            setIsShown: isShown,
            activeMovie: activeMovie,
            hoverHistory: history
        });
    }

    /**
     * TODO Split up the vstdLst into separate list to keep track
     * Update rating on each panel separately
     * @param {string} panelid refers to the id of the MovieSidePanel for callback
     * @param {int} newRating the user updated rating for a movie
     * @param {string} movieid the id of the movie to be updated
     */
    handleRating(panelid, newRating, movieid) {
        let panel = this.state[panelid];
        let movieLst = [...panel.items];
        let vstdLst = [...this.state.visited];
        let panelvstd = [...panel.vstd];
        let ratedItm = movieLst.map(movie => (
            movie.movie_id === movieid ? {
                ...movie, rating: newRating
            } : movie
        ));

        let ratingHistory = [...this.state.ratingHistory];
        let rated = {
            item_id: movieid,
            rating: newRating,
            rating_date: new Date().toUTCString(),
            loc: panel.tag,
            level: this.props.level
        };
        ratingHistory.push(rated);
        if (!panelvstd.some(itemid => itemid === movieid)) panelvstd.push(movieid);

        let isNew = !vstdLst.some(item => item.item_id === movieid);
        if (isNew) {
            vstdLst.push(rated);

        } else {
            vstdLst = vstdLst.map(movie => (
                movie.item_id === movieid ? {
                    ...movie,
                    rating: newRating,
                    rating_date: new Date().toUTCString()
                } : movie
            ));
        }
        panel.items = ratedItm;
        panel.vstd = panelvstd;
        this.setState({
            panelid: panel,
            visited: vstdLst,
            ratingHistory: ratingHistory
        });
    }

    handleSelect(panelid, movieid) {
        let panel = this.state[panelid];
        let ratingHistory = [...this.state.ratingHistory];
        let rated = {
            item_id: movieid,
            rating: 99,
            rating_date: new Date().toUTCString(),
            loc: panel.tag,
            level: this.props.level
        };
        ratingHistory.push(rated);

        this.setState({
            selectedid: movieid,
            ratingHistory: ratingHistory
        });
    }

    onBeforeChange = nextStepIndex => {
        if (nextStepIndex === 1) {
            this.steps.updateStepElement(nextStepIndex);
        }
    }

    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
    };

    render() {
        let pick = this.state.pick;
        let selectedid = this.state.selectedid;

        let userid = this.state.userid;
        let pageid = this.state.pageid;

        let movies = this.state.movies;
        const dest = this.props.dest;

        if (this.state.updateSuccess) {

            let ratings = this.state.visited.concat(this.state.ratings);
            let selectedmovie = [...movies].find((movie) => (
                movie.movie_id === selectedid
            ));
            return (
                <Navigate to={dest} state={
                    {
                        userid: userid,
                        ratings: ratings,
                        recs: movies.slice(0, 10),
                        pageid: pageid,
                        selectedmovie: selectedmovie
                    }
                }
                />
            );
        }

        let buttonDisabled = selectedid === undefined;

        let buttonVariant = buttonDisabled ? 'secondary' : 'primary';

        const {
            stepsEnabled,
            steps,
            initialStep,
        } = this.state;

        return this.state.ready ? (
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
                    <h1 className="header">{this.props.pageHeader}</h1>
                    <p>{this.props.headerSubtitle}
                    </p>
                </div>

                <div className="row g-0">
                    <div className="col-sm-4 gx-sm-4" id="emotionPanel">
                        <div className="emoPrefControlPanel">
                            <div style={{ marginTop: "2rem" }}>
                                <p style={{ fontWeight: "800" }}>
                                    Please inspect the recommendations and adjust them to your preference.
                                </p>

                                <ol>
                                    <li>
                                        <p>
                                            Among the movies in your system, we predict that you will like these 7 movies the best based on your ratings.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            You can hover over movies to see a preview of the poster, a short synopsis, and a radar graph depicting the movie's emotional feature in 8 emotions: joy, trust, fear, surprise, surprise, sadness, disgust, anger, and anticipation.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            You can specify your preference of movies from the perspective of movie emotions in the following panel. Please adjust the emotion strength indicators bellow so we could fine-tune the recommendations for you.
                                        </p>
                                    </li>
                                </ol>
                                <p style={{ fontWeight: "800" }}>
                                    Adjust the recommendations until they best fit your preferences.
                                </p>
                            </div>
                            <div style={{ marginTop: "4em" }}>
                                {/* <EmotionToggle /> */}
                                <EmotionSlider />
                            </div>
                            <Button variant="info" onClick={evt => this.sortmovies('anger')}>Anger</Button>
                            <Button variant="info" onClick={evt => this.sortmovies('joy')}>Joy</Button>
                        </div>
                    </div>
                    <MovieSidePanel id="leftPanel" movieList={movies.slice(0, 10)}
                        panelTitle={'Movies you may like'}
                        panelByline={''}
                        render={(props) => <SidePanelItem {...props} />}
                        hoverHandler={this.handleHover}
                    />
                    <div className="col-sm-4 gx-sm-4" id="moviePosterPreview">
                        {this.state.setIsShown && (this.state.activeMovie != null) ? (
                            <Card bg="light" text="black">
                                <Card.Body style={{ height: '900px' }}>
                                    <Card.Img variant="top" className="d-flex mx-auto d-block img-thumbnail"
                                        src={this.state.activeMovie.poster} alt={"Poster of the movie " +
                                            this.state.activeMovie.title}
                                        style={{ maxHeight: "36%", minHeight: "36%", width: "auto" }} />
                                    <Card.Title style={{ marginTop: "0.5rem" }}>
                                        {this.state.activeMovie.title}
                                    </Card.Title>
                                    <Container className="overflow-auto" style={{ height: "27%" }}>
                                        <Card.Text>
                                            {this.state.activeMovie.description}
                                        </Card.Text>
                                    </Container>
                                    <EmotionStats movie={this.state.activeMovie} />
                                </Card.Body>
                            </Card>
                        ) : (<div style={{ height: "900px" }} />)
                        }
                    </div>
                </div>
                <div className="jumbotron jumbotron-footer">
                    <Button className="next-button footer-btn" variant={buttonVariant} size="lg"
                        disabled={buttonDisabled && !this.state.loading}
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
        ) :
            (
                <>
                    <LoadingAnimation waitMsg={this.props.waitMsg}></LoadingAnimation>
                </>
            );
    }
}

export default withRouter(EmotionPref);