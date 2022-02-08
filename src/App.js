import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorBoundary from './content/utils/ErrorBoundary';
import WelcomePage from './content/pages/welcome';
import InstructionPage from './content/pages/instructions';
import RatingPage from './content/pages/ratemovies';
import RecommendationPageOne from './content/pages/raterecsone';
import RecommendationPageTwo from './content/pages/raterecstwo';
import RecommendationPageThree from './content/pages/pickrecs';
import SurveyPage from './content/pages/survey';
import ExitPage from './content/pages/exit';

class App extends Component {

    render() {
        return (
            <div>
                <div className="App">
                    <nav className="navbar navbar-light bg-light" 
                        style={{ paddingLeft: "1.0em", paddingRight: "1.0em"}}>
                        <span className="navbar-brand mb-0 h1">Movie Recommender Study</span>
                    </nav>
                </div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={WelcomePage}/>
                        <Route path="/instructions" component={InstructionPage} />
                        {/*render={() => (
                            <ErrorBoundary>
                                <InstructionPage title="RSSA Survey Instructions" />
                            </ErrorBoundary>
                        )}/>*/}
                        <Route path="/ratemovies" component={RatingPage} />
                        {/*render={() => (
                            <ErrorBoundary>
                                <RatingPage title="RSSA Rate Movie" />
                            </ErrorBoundary>
                        )}/>*/}
                        <Route path="/raterecommendations1" component={RecommendationPageOne} />
                        {/*render={() => (
                            <ErrorBoundary>
                                <RecommendationPageOne title="RSSA Recommendations" />
                            </ErrorBoundary>
                        )}/>*/}
                        <Route path="/raterecommendations2" component={RecommendationPageTwo} />
                        {/*render={() => (
                            <ErrorBoundary>
                                <RecommendationPageTwo title="RSSA Recommendations" />
                            </ErrorBoundary>
                        )}/>*/}
                        <Route path="/raterecommendations3" component={RecommendationPageThree} />
                        {/*render={() => (
                            <ErrorBoundary>
                                <RecommendationPageThree title="RSSA Recommendations" />
                            </ErrorBoundary>
                        )}/>*/}
                        <Route path="/survey" component={SurveyPage} />
                        {/*render={() => (
                            <ErrorBoundary>
                                <SurveyPage title="RSSA Survey Questionnaire" />
                            </ErrorBoundary>
                        )}/>*/}
                        <Route path="/exit" component={ExitPage} />
                        {/*render={() => (
                            <ErrorBoundary>
                                <ExitPage title="RSSA" />
                            </ErrorBoundary>
                        )}/>*/}
                    </Switch>

                </Router>
            </div>
        );
    }
}

export default App;
