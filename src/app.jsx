import { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingAnimation from "./content/widgets/animatedLoader";
import LandingPage from "./landing";

const ERS = lazy(() => import('./apps/ers'));
const PrefViz = lazy(() => import('./apps/prefviz'));
const RSSA = lazy(() => import('./apps/rssaApp'));
const RSSAStudy = lazy(() => import('./apps/rssa'));
const RSSABaseline = lazy(() => import('./apps/rssaBaseline'));
const CyberEd = lazy(() => import('./apps/cybered'));

class SurveyPortal extends Component {

	render() {
		return (
			<>
				<Router basename='/'>
					<Suspense fallback={<LoadingAnimation />}>
						<Routes>
							<Route exact path="/" element={<LandingPage />}></Route>
							<Route exact path="/rssaapp/*" element={<RSSA />}></Route>
							<Route exact path="/cybered/*" element={<CyberEd />}></Route>
							<Route path="/rssa/*" element={<RSSAStudy />}></Route>
							<Route path="/rssabase/*" element={<RSSABaseline />}></Route>
							<Route exact path="/ers/*" element={<ERS />}></Route>
							<Route exact path="/prefviz/*" element={<PrefViz />}></Route>
						</Routes>
					</Suspense>
				</Router>
			</>
		)
	}

}

export default SurveyPortal;