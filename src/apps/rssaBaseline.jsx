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
import RecommendationPageBaseline from '../content/pages/raterecsBaseline';
import SurveyPage from '../content/pages/survey';
import WelcomePage from '../content/pages/welcome';
import ProgressBarComponent from "../content/widgets/progressBar";
import SelectrecsBaseline from '../content/pages/selectrecsBaseline';
import SizeWarningDialog from '../content/widgets/sizewarnigdialog';

class RSSABaseline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false,
            progress: 0,
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
                        <Routes>
                            <Route exact path="/" element={<WelcomePage
                                userType={'rssabaseline_survey'}
                                progressUpdater={this.progressUpdater} dest="/rssabase/presurvey" />} />

                            <Route path="/presurvey" element={<SurveyPage
                                questionBank={preSurveyBank}
                                progressUpdater={this.progressUpdater} dest="/rssabase/instructions" />} key={1} />

                            <Route path="/instructions" element={<InstructionPage
                                activitySync={this.activitySync}
                                progressUpdater={this.progressUpdater} dest="/rssabase/ratemovies" />} />

                            <Route path="/ratemovies" element={<RatingPage
                                progressUpdater={this.progressUpdater} dest="/rssabase/raterecommendations1" />} />

                            <Route path="/raterecommendations1" element={<RecommendationPageBaseline
                                progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                waitMsg={"Please hang on while we find the recommendations for you."}
                                pageHeader={"Refine your recommendations: Step 1 of 2"}
                                headerSubtitle={"Please rate the following recommendations and alternative items to help us fine-tune our recommendations to you. Please rate all movies, even the ones you haven’t watched (read the description and then guess how you’d rate it.)"}
                                finalhint={"Once you are done rating all the movies, click next to get a refined set of recommendations."}
                                dest="/rssabase/raterecommendations2" key={1} level={1} />}
                            />
                            <Route path="/raterecommendations2" element={<RecommendationPageBaseline
                                progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                waitMsg={"Please hang on while we fine tune your recommendations."}
                                pageHeader={"Refine your recommendations: Step 2 of 2"}
                                headerSubtitle={"Please rate the following recommendations and alternative items to help us finalize our recommendations to you. Please rate all movies, even the ones you haven’t watched (read the description and then guess how you’d rate it.)"}
                                finalhint={"Once you are done rating all the movies, click next to see the final list of recommendations."}
                                dest="/rssabase/selectrecommendation" key={2} level={2} />}
                            />
                            <Route path="/selectrecommendation" element={<SelectrecsBaseline
                                progressUpdater={this.progressUpdater} toggleLoader={this.loaderToggler}
                                waitMsg={"Please hang on while we build your final recommendations."}
                                pageHeader={"Select a movie to watch"}
                                headerSubtitle={"These are your final recommendations. Among the movies in our system, we predict that you will like the 7 movies (on the left) the best. Please select one movie that you would like to watch right now if you could."}
                                finalhint={"Once you made your choice about selecting a movie to watch, click next to exit the recommender system."}
                                dest="/rssabase/endrecommendations" pick={true} key={3} level={3} />}
                            />

                            <Route path="/endrecommendations" element={<ClosingRecommendationPage
                                progressUpdater={this.progressUpdater}
                                dest="/rssabase/survey" />} />

                            <Route path="/survey" element={<SurveyPage
                                questionBank={qBank} progressUpdater={this.progressUpdater}
                                dest="/rssabase/demographicinfo" />} key={2} />

                            <Route path="/demographicinfo" element={<DemographicInfoPage
                                progressUpdater={this.progressUpdater} finalPage={true}
                                dest="/rssabase/exit" />} />
                            <Route path="/exit" element={<ExitPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

export default RSSABaseline;
