import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class LandingPage extends Component {
	render() {
		return (
			<div>
				<Container>
					<Row>
						<h4>Welcome to the Recommender Systems Survey Portal.</h4>
						<p>
							This portal is maintained by <Link to={{ pathname: "https://mehtabi.people.clemson.edu" }}>Shahan</Link>. The PI
							for all the survey projects listed here is Dr. Bart Knijnenburg at the Clemson University and the HATLab.
						</p>
					</Row>
					<Row>
						<Col>
							<ul>
								<li>
									<Link to="/rssa" replace> RS for Self Actualization </Link>
								</li>
								<li>
									<Link to="/rssabase" replace> RS for Self Actualization - Baseline Experiment </Link>
								</li>
								<li>
									<Link to="/ers" replace> Emotion RS </Link>
								</li>
								<li>
									<Link to="/prefvis" replace> Preference Visualization </Link>
								</li>
							</ul>
						</Col>
					</Row>
					<Row>
						<div>
							<p>Disclaimer: If you are here from Prolific then none of these link will lead to a verified payout code.
								Please go back to Prolific and use the URL provided by Prolific to take part in the survey.
							</p>
						</div>
					</Row>
				</Container>
			</div>
		)
	}
}

export default LandingPage;