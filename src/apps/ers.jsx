import './App.css';
import './ers.css';
import "react-step-progress-bar/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { API, qBank, preSurveyBank } from '../content/utils/constants';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SizeWarningDialog from '../content/widgets/sizewarnigdialog';

import WelcomePage from '../content/pages/welcome';
import InstructionPage from '../content/pages/instructions';
import RatingPage from '../content/pages/ratemovies';
import EmotionPref from '../content/pages/emoPref';
import SurveyPage from '../content/pages/survey';
import ExitPage from '../content/pages/exit';
import ProgressBarComponent from "../content/widgets/progressBar";
import ClosingRecommendationPage from '../content/pages/closingRecs';
import DemographicInfoPage from '../content/pages/demography';
import axios from 'axios';

class ERS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false,
            progress: 0,
            screenWidth: undefined
        };
        this.loaderToggler = this.toggleLoader.bind(this);
        this.progressUpdater = this.updateProgress.bind(this);
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

    render() {
        let loaderActive = this.state.loaderActive;
        let prog = this.state.progress;
        let progBarVisibility = loaderActive ? "pb_invisible" : "pb_visible";

        return (
            <div className="App">
                <Navbar id="topnav" bg="light">
                    <Navbar.Brand style={{ marginLeft: "1em", fontWeight: "450" }}>Movie Recommender Study</Navbar.Brand>
                </Navbar>
                <div className="contentWrapper">
                    <SizeWarningDialog />
                    <div style={{ margin: "0 3em" }}>
                        <div className={progBarVisibility} style={{ zIndex: "2048" }}>
                            <ProgressBarComponent className={progBarVisibility} percentComplete={prog} />
                        </div>
                        {/* <Router basename='/ers'> */}
                        <Routes>
                            {/* <Route exact path="/" render={(props) => <WelcomePage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} dest="/presurvey" />} /> */}

                            <Route exact path="/" element={<WelcomePage
                                activitySync={this.activitySync}
                                progressUpdater={this.progressUpdater} dest={"/ers/instructions"} />} />

                            {/* <Route path="/presurvey" render={(props) => <SurveyPage {...props}
                                    questionBank={preSurveyBank}
                                    progressUpdater={this.progressUpdater} dest="/instructions" />} key={1} /> */}

                            <Route path="/instructions" element={<InstructionPage
                                activitySync={this.activitySync}
                                progressUpdater={this.progressUpdater} dest={"/ers/ratemovies"} />} />

                            <Route path="/ratemovies" element={<RatingPage
                                progressUpdater={this.progressUpdater} dest={"/ers/emoprefs"} />}
                                subset={'ers'}
                            />

                            <Route path="/emoprefs" element={<EmotionPref
                                progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                waitMsg={"Please hang on while we find the recommendations for you."}
                                pageHeader={"Refine your recommendations: Step 1 of 2"}
                                headerSubtitle={"Please rate the following recommendations and alternative items to help us fine-tune our recommendations to you. Please rate all movies, even the ones you haven’t watched (read the description and then guess how you’d rate it.)"}
                                finalhint={"Once you are done rating all the movies, click next to get a refined set of recommendations."}
                                dest="/ers/exit" key={1} level={1}
                            />}
                            />

                            {/* <Route path="/endrecommendations" render={(props) => <ClosingRecommendationPage {...props}
                                    progressUpdater={this.progressUpdater}
                                    dest="/survey" />} />

                                <Route path="/survey" render={(props) => <SurveyPage {...props}
                                    questionBank={qBank} progressUpdater={this.progressUpdater}
                                    dest="/demographicinfo" />} key={2} />

                                <Route path="/demographicinfo" render={(props) => <DemographicInfoPage {...props}
                                    progressUpdater={this.progressUpdater} finalPage={true}
                                    dest="/exit" />} /> */}
                            {/* <Route path="/ers/exit" component={ExitPage} /> */}
                        </Routes>
                        {/* </Router> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default ERS;
