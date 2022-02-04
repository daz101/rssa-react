import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Exit from './content/ExitPage';
import Instructions from './content/Instructions';
import MovieInfo from './content/movieRecPick';
import Movies from './content/movieRecRating';
import MoviesList from "./content/movies-list.component";
import Preferences from './content/Preferences/prefPage';
import Survey from "./content/survey";
import Welcome from './content/welcome';

class App extends Component {

    render() {
        return (
            <div>
                <div className="App">
                    <nav className="navbar navbar-light bg-light">
                        <span className="navbar-brand mb-0 h1">Movie Recommender Study</span>
                    </nav>

                </div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Welcome}/>
                        <Route path="/inst" component={Instructions}/>
                        <Route path="/pref" component={Preferences}/>
                        <Route path="/movies" component={Movies}/>
                        <Route path="/movieInfo" component={MovieInfo}/>
                        <Route path="/survey" component={Survey}/>
                        <Route path="/exit" component={Exit}/>
                        <Route path="/mern" component={MoviesList}/>
                    </Switch>

                </Router>
            </div>
        );
    }
}
 
export default App;
