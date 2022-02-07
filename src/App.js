import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
                        <Route path="/instructions" component={InstructionPage}/>
                        <Route path="/ratemovies" component={RatingPage}/>
                        <Route path="/raterecommendations1" component={RecommendationPageOne}/>
                        <Route path="/raterecommendations2" component={RecommendationPageTwo}/>
                        <Route path="/pickrecommendations" component={RecommendationPageThree}/>
                        <Route path="/survey" component={SurveyPage}/>
                        <Route path="/exit" component={ExitPage}/>
                    </Switch>

                </Router>
            </div>
        );
    }
}
 
export default App;
