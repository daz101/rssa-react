import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Route, Routes } from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { preSurveyBank, qBank } from '../content/utils/constants';
import './App.css';

import ClosingRecommendationPage from '../content/pages/closingRecs';
import DemographicInfoPage from '../content/pages/demography';
import ExitPage from '../content/pages/exit';
import InstructionPage from '../content/pages/instructions';
import RatingPage from '../content/pages/ratemovies';
import RecommendationPage from '../content/pages/raterecs';
import RecommendationPageSelect from '../content/pages/selectrecs';
import SurveyPage from '../content/pages/survey';
import WelcomePage from '../content/pages/welcome';
import ProgressBarComponent from "../content/widgets/progressBar";

class RSSA extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false,
            progress: 0,
            screenWidth: undefined
        };
        this.loaderToggler = this.toggleLoader.bind(this);
        this.progressUpdater = this.updateProgress.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions);
        this.setState({ screenWidth: window.innerWidth });
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
                        <Routes>
                            <Route exact path="/" element={<WelcomePage
                                activitySync={this.activitySync}
                                progressUpdater={this.progressUpdater} dest="/rssa/presurvey" />} />

                            <Route path="/presurvey" element={<SurveyPage
                                questionBank={preSurveyBank}
                                progressUpdater={this.progressUpdater} dest="/rssa/instructions" />} key={1} />

                            <Route path="/instructions" element={<InstructionPage
                                activitySync={this.activitySync}
                                progressUpdater={this.progressUpdater} dest="/rssa/ratemovies" />} />

                            <Route path="/ratemovies" element={<RatingPage
                                progressUpdater={this.progressUpdater} dest="/rssa/raterecommendations1" />} />

                            <Route path="/raterecommendations1" element={<RecommendationPage
                                progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                waitMsg={"Please hang on while we find the recommendations for you."}
                                pageHeader={"Refine your recommendations: Step 1 of 2"}
                                headerSubtitle={"Please rate the following recommendations and alternative items to help us fine-tune our recommendations to you. Please rate all movies, even the ones you haven’t watched (read the description and then guess how you’d rate it.)"}
                                finalhint={"Once you are done rating all the movies, click next to get a refined set of recommendations."}
                                dest="/rssa/raterecommendations2" key={1} level={1} />}
                            />
                            <Route path="/raterecommendations2" element={<RecommendationPage
                                progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                waitMsg={"Please hang on while we fine tune your recommendations."}
                                pageHeader={"Refine your recommendations: Step 2 of 2"}
                                headerSubtitle={"Please rate the following recommendations and alternative items to help us finalize our recommendations to you. Please rate all movies, even the ones you haven’t watched (read the description and then guess how you’d rate it.)"}
                                finalhint={"Once you are done rating all the movies, click next to see the final list of recommendations."}
                                dest="/rssa/selectrecommendation" key={2} level={2} />}
                            />
                            <Route path="/selectrecommendation" element={<RecommendationPageSelect
                                progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                waitMsg={"Please hang on while we build your final recommendations."}
                                pageHeader={"Select a movie to watch"}
                                headerSubtitle={"These are your final recommendations. Among the movies in our system, we predict that you will like the 7 movies (on the left) the best. Please select one movie that you would like to watch right now if you could."}
                                finalhint={"Once you made your choice about selecting a movie to watch, click next to exit the recommender system."}
                                dest="/rssa/endrecommendations" pick={true} key={3} level={3} />}
                            />

                            <Route path="/endrecommendations" element={<ClosingRecommendationPage
                                progressUpdater={this.progressUpdater}
                                dest="/rssa/survey" />} />

                            <Route path="/survey" element={<SurveyPage
                                questionBank={qBank} progressUpdater={this.progressUpdater}
                                dest="/rssa/demographicinfo" />} key={2} />

                            <Route path="/demographicinfo" element={<DemographicInfoPage
                                progressUpdater={this.progressUpdater} finalPage={true}
                                dest="/rssa/exit" />} />
                            <Route path="/exit" element={<ExitPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

export default RSSA;
