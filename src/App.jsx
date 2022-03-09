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
        fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userid,
                pageid: pageid,
                pageWidth: pageWidth,
                pageHeight: pageHeight,
                mouseActivity: posData
            })
        }).then(res => res.json())
            .then(response => console.log('Success:', response))
            .catch(error => console.error('Error:', error));
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
                        <div className={progBarVisibility}>
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
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} dest="/raterecommendation1" />} />
                                <Route path="/raterecommendations1" render={(props) => <RecommendationPage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                    waitMsg={"Please hang on while we find the recommendations for you."}
                                    pageHeader={"Rating Recommendations: Step 1 of 2"}
                                    headerSubtitle={"Please rate the following recommendations to help us fine tune recommendations for you."}
                                    dest="/raterecommendations2" key={1} />} />
                                <Route path="/raterecommendations2" render={(props) => <RecommendationPage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                    waitMsg={"Please hang on while we fine tune your recommendations."}
                                    pageHeader={"Rating Recommendations: Step 2 of 2"}
                                    headerSubtitle={"Please rate the following recommendations to help us finalize your recommendations."}
                                    dest="/raterecommendations3" key={2} />} />
                                <Route path="/raterecommendations3" render={(props) => <RecommendationPage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                    waitMsg={"Please hang on while we build your final recommendations."}
                                    pageHeader={"Choosing A Recommendation"}
                                    headerSubtitle={"Please pick one movie that you would watch right now if you could."}
                                    dest="/survey" pick={true} key={3} />} />
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
