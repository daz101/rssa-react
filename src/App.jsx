import './App.css';
import "react-step-progress-bar/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { API } from './content/utils/constants';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WelcomePage from './content/pages/welcome';
import InstructionPage from './content/pages/instructions';
import RatingPage from './content/pages/ratemovies';
import RecommendationPage from './content/pages/raterecs';
import SurveyPage from './content/pages/survey';
import ExitPage from './content/pages/exit';
import ProgressBarComponent from "./content/widgets/progressBar";
import ClosingRecommendationPage from './content/pages/closingRecs';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false,
            progress: 0
        };
        this.loaderToggler = this.toggleLoader.bind(this);
        this.progressUpdater = this.updateProgress.bind(this);
        this.activitySync = this.syncMouseActivity.bind(this);
    }

    toggleLoader(toggle) {
        this.setState({
            loaderActive: toggle
        });
    }

    updateProgress(stepsize = 5) {
        let prog = this.state.progress + stepsize;

        this.setState({
            progress: prog > 100 ? 100 : prog
        });
    }

    syncMouseActivity(posData, pageWidth, pageHeight, userid, pageid) {
        const url = API + 'sync_movement';
        axios.put(url, {
            userid: userid,
            pageid: pageid,
            pageWidth: pageWidth,
            pageHeight: pageHeight,
            mouseActivity: posData
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                }
            })
    }

    render() {
        let loaderActive = this.state.loaderActive;
        let prog = this.state.progress;
        let progBarVisibility = loaderActive ? "pb_invisible" : "pb_visible";
        return (
            <div className="App">
                <Navbar bg="light">
                    <Navbar.Brand style={{ marginLeft: "1em", fontWeight: "450" }}>Movie Recommender Study</Navbar.Brand>
                </Navbar>
                <div className="contentWrapper">

                    <div style={{ margin: "0 3em" }}>
                        <div className={progBarVisibility} style={{ zIndex: "2048" }}>
                            <ProgressBarComponent className={progBarVisibility} percentComplete={prog} />
                        </div>
                        <Router basename='/rssa'>
                            <Switch>
                                <Route exact path="/" render={(props) => <WelcomePage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} dest="/instructions" />} />
                                <Route path="/instructions" render={(props) => <InstructionPage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} dest="/ratemovies" />} />
                                <Route path="/ratemovies" render={(props) => <RatingPage {...props}
                                    progressUpdater={this.progressUpdater} dest="/raterecommendation1" />} />

                                <Route path="/raterecommendations1" render={(props) => <RecommendationPage {...props}
                                    progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                    waitMsg={"Please hang on while we find the recommendations for you."}
                                    pageHeader={"Refine your recommendations: Step 1 of 2"}
                                    headerSubtitle={"Please rate the following recommendations and alternative items to help us fine-tune our recommendations to you. Please rate all movies, even the ones you haven’t watched (read the description and then guess how you’d rate it.)"}
                                    dest="/raterecommendations2" key={1} level={1} />} />
                                <Route path="/raterecommendations2" render={(props) => <RecommendationPage {...props}
                                    progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                    waitMsg={"Please hang on while we fine tune your recommendations."}
                                    pageHeader={"Refine your recommendations: Step 2 of 2"}
                                    headerSubtitle={"Please rate the following recommendations and alternative items to help us finalize our recommendations to you. Please rate all movies, even the ones you haven’t watched (read the description and then guess how you’d rate it.)"}
                                    dest="/raterecommendations3" key={2} level={2} />} />
                                <Route path="/raterecommendations3" render={(props) => <RecommendationPage {...props}
                                    progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                    waitMsg={"Please hang on while we build your final recommendations."}
                                    pageHeader={"Select a movie to watch"}
                                    headerSubtitle={"These are your final recommendations. Among the movies in our system, we predict that you will like these 7 movies the best."}
                                    dest="/endrecommendations" pick={true} key={3} level={3} />} />

                                <Route path="/endrecommendations" render={(props) => <ClosingRecommendationPage {...props}
                                    progressUpdater={this.progressUpdater}
                                    dest="/survey" />} />

                                <Route path="/survey" render={(props) => <SurveyPage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} dest="/exit" key={3} />} />
                                <Route path="/exit" component={ExitPage} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
