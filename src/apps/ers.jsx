import './App.css';
import "react-step-progress-bar/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { API, qBank, preSurveyBank } from '../content/utils/constants';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
        this.activitySync = this.syncMouseActivity.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions);
        this.setState({ screenWidht: window.innerWidth });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ screenWidth: window.innerWidth });
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
        let show = this.state.screenWidth < 1260;

        return (
            <div className="App">
                <Navbar id="topnav" bg="light">
                    <Navbar.Brand style={{ marginLeft: "1em", fontWeight: "450" }}>Movie Recommender Study</Navbar.Brand>
                </Navbar>
                <div className="contentWrapper">
                    <div style={{
                        position: "absolute", display: "flex", flexDirection: "column", height: "360px",
                        width: "1300px", pointerEvents: "auto", backgroundColor: "#fff", backgroundClip: "padding-box",
                        border: "9px solid rgba(90, 180, 90, 0.7)", borderRadius: ".3rem", outline: "0", zIndex: "2080",
                        margin: "0 0 0 9px", visibility: show ? "unset" : "hidden"
                    }}>
                        <p style={{ margin: "9px auto 0", fontSize: "2em", lineHeight: "1.2", fontWeight: "500" }}>
                            Window Dimension Too Small
                        </p>
                        <hr />
                        <p style={{ fontSize: "1.5em", margin: "0 auto" }}>
                            For optimal viewing please increase your browser width that the green border is inside the viewing area.
                        </p>
                    </div>
                    <div style={{ margin: "0 3em" }}>
                        <div className={progBarVisibility} style={{ zIndex: "2048" }}>
                            <ProgressBarComponent className={progBarVisibility} percentComplete={prog} />
                        </div>
                        <Router basename='/ers'>
                            <Switch>
                                {/* <Route exact path="/" render={(props) => <WelcomePage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} dest="/presurvey" />} /> */}
								
								<Route exact path="/" render={(props) => <WelcomePage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} dest="/instructions" />} />

                                {/* <Route path="/presurvey" render={(props) => <SurveyPage {...props}
                                    questionBank={preSurveyBank}
                                    progressUpdater={this.progressUpdater} dest="/instructions" />} key={1} /> */}

                                <Route path="/instructions" render={(props) => <InstructionPage {...props}
                                    activitySync={this.activitySync}
                                    progressUpdater={this.progressUpdater} dest="/ratemovies" />} />

                                <Route path="/ratemovies" render={(props) => <RatingPage {...props}
                                    progressUpdater={this.progressUpdater} dest="/emoprefs" />}
									subset={'ers'}
									/>

                                <Route path="/emoprefs" render={(props) => 
									<EmotionPref {...props}
										progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
										waitMsg={"Please hang on while we find the recommendations for you."}
										pageHeader={"Refine your recommendations: Step 1 of 2"}
										headerSubtitle={"Please rate the following recommendations and alternative items to help us fine-tune our recommendations to you. Please rate all movies, even the ones you haven’t watched (read the description and then guess how you’d rate it.)"}
										finalhint={"Once you are done rating all the movies, click next to get a refined set of recommendations."} 
										dest="/exit" key={1} level={1} 
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
                                <Route path="/exit" component={ExitPage} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default ERS;
