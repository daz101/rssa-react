import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ERS from "./apps/ers";
import RSSA from "./apps/rssa";
import LandingPage from "./landing";


class SurveyPortal extends Component {

	render() {
		return (
			<>
				<Router basename='/'>
					<Switch>
						<Route exact path="/">
							<LandingPage />
						</Route>
						<Route exact path="/rssa">
							<RSSA />
						</Route>
						<Route exact path="/ers">
							<ERS />
						</Route>
					</Switch>
				</Router>
			</>
		)
	}

}

export default SurveyPortal;