import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ERS from "./apps/ers";
import PrefViz from "./apps/prefviz";
import RSSA from "./apps/rssa";
import RSSABaseline from "./apps/rssaBaseline";
import LandingPage from "./landing";


class SurveyPortal extends Component {

	render() {
		return (
			<>
				<Router basename='/'>
					<Routes>
						<Route exact path="/" element={<LandingPage />}>
						</Route>
						<Route path="/rssa/*" element={<RSSA />}>
						</Route>
						<Route path="/rssabase/*" element={<RSSABaseline />}>
						</Route>
						<Route exact path="/ers/*" element={<ERS />}>
						</Route>
						<Route exact path="/prefviz/*" element={<PrefViz />}>
						</Route>
					</Routes>
				</Router>
			</>
		)
	}

}

export default SurveyPortal;