import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class LandingPage extends Component {
	render() {
		return (
			<div style={{marginTop: "144px", textShadow: "0.18px .18px gray"}}>
				<Container>
					<Row>
						<h3>Welcome to the Recommender Systems Survey Portal.</h3>
						<p>
							This portal is maintained by <Link to={{ pathname: "https://mehtabi.people.clemson.edu" }}>Shahan</Link>. The PI
							for all the survey projects listed here is Dr. Bart Knijnenburg at the Clemson University and 
							the <Link to={{ pathname: "https://hatlab.org/"}}>HATLab</Link>.
						</p>
					</Row>
					<Row>
						<Col>
							<h4>RS Apps</h4>
							<ul>
								<li>
									<Link to="rssaapp"> RS for Self Actualization </Link>
								</li>
								<li>
									<Link to="cybered"> RSSA for CyberEd </Link>
								</li>
							</ul>
							<h4>Surveys and Studies</h4>
							<ul>
								<li>
									<Link to="rssa"> RS for Self Actualization - Study </Link>
								</li>
								<li>
									<Link to="rssabase" replace> RS for Self Actualization - Baseline Study </Link>
								</li>
								<li>
									<Link to="ers"> Emotion RS - Study</Link>
								</li>
								<li>
									<Link to="prefviz"> Preference Visualization - Study</Link>
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