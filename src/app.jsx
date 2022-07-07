import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ERS from "./apps/ers";
import PrefViz from "./apps/prefviz";
import RSSA from "./apps/rssaApp";
import RSSAStudy from "./apps/rssa";
import RSSABaseline from "./apps/rssaBaseline";
import LandingPage from "./landing";
import CyberEd from "./apps/cybered";


class SurveyPortal extends Component {

	render() {
		return (
			<>
				<Router basename='/'>
					<Routes>
						<Route exact path="/" element={<LandingPage />}></Route>
						<Route exact path="/rssaapp/*" element={<RSSA />}></Route>
						<Route exact path="/cybered/*" element={<CyberEd />}></Route>
						<Route path="/rssa/*" element={<RSSAStudy />}></Route>
						<Route path="/rssabase/*" element={<RSSABaseline />}></Route>
						<Route exact path="/ers/*" element={<ERS />}></Route>
						<Route exact path="/prefviz/*" element={<PrefViz />}></Route>
					</Routes>
				</Router>
			</>
		)
	}

}

export default SurveyPortal;