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
import SurveyPage from '../content/pages/survey';
import WelcomePage from '../content/pages/welcome';
import ProgressBarComponent from "../content/widgets/progressBar";
import SizeWarningDialog from '../content/widgets/sizewarnigdialog';
import CommunityPreference from '../content/pages/communitypref';

class PrefViz extends Component {

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
                                userType={'prefviz_survey'}
                                progressUpdater={this.progressUpdater} dest="/prefviz/ratemovies" />} />

                            {/* <Route path="/presurvey" render={(props) => <SurveyPage {...props}
                                questionBank={preSurveyBank}
                                progressUpdater={this.progressUpdater} dest="/instructions" />} key={1} /> */}

                            {/* <Route path="/instructions" render={(props) => <InstructionPage {...props}
                                activitySync={this.activitySync}
                                progressUpdater={this.progressUpdater} dest="/ratemovies" />} /> */}

                            <Route path="/ratemovies" element={<RatingPage
                                progressUpdater={this.progressUpdater} dest="/prefviz/commpref" />} />

                            <Route path="/commpref/*" element={<CommunityPreference 
                                progressUpdater={this.progressUpdater} dest="/prefviz/exit" />} />

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
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrefViz;
