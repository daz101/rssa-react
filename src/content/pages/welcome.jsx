import axios from 'axios';
import { Component } from 'react';
import { Button, Card, Form, Modal, Spinner } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import withRouter from '../hooks/withRouter';
import { API } from '../utils/constants';

class WelcomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			disabled: true,
			welcomeDateTime: undefined,
			consentStartTime: undefined,
			userid: undefined,
			userCreated: false,
			loading: false
		};
		this.displaySurvey = this.showSurvey.bind(this);
		this.createNewUser = this.createUser.bind(this);
	}

	componentDidMount() {
		const windowUrl = window.location.search;
		const query = new URLSearchParams(windowUrl);
		const prolific_pid = query.get('PROLIFIC_PID') || 'undefined';
		const study_id = query.get('STUDY_ID') || 'undefined';
		const session_id = query.get('SESSION_ID') || 'undefined';
		const surveyStartTime = new Date();

		let platform_info = {
			prolific_pid: prolific_pid,
			study_id: study_id,
			session_id: session_id,
			start_time: surveyStartTime.toUTCString()
		};
		this.setState({
			welcomeDateTime: surveyStartTime,
			platformInfo: platform_info
		});
	}

	showSurvey() {
		this.setState({
			show: true,
			consentStartTime: new Date()
		});
	}

	createUser() {
		this.setState({
			loading: true
		});

		const consentEndTime = new Date();
		const welcomeDateTime = this.state.welcomeDateTime;
		const consentStartTime = this.state.consentStartTime;
		const platformInfo = this.state.platformInfo;
		const userType = this.props.userType;

		axios.post(API + 'new_user', {
			welcomeTime: welcomeDateTime.toUTCString(),
			consentStartTime: consentStartTime.toUTCString(),
			consentEndTime: consentEndTime.toUTCString(),
			userType: userType,
			platformInfo: platformInfo
		},
			{
				headers: {
					'Access-Control-Allow-Credentials': true,
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(response => {
				if (response.status === 200) {
					this.setState({
						userCreated: true,
						userid: response.data['user_id']
					}
					);
					this.props.progressUpdater();
				}
			});
	}

	render() {
		const dest = this.props.dest;

		const show = this.state.show;
		let userid = this.state.userid;
		let userCreated = this.state.userCreated
		if (userCreated) {
			return (
				<Navigate to={dest} state={
					{
						userid: userid,
						pageid: 2
					}
				} />
			);
		}

		return (
			<>
				<div className="jumbotron">
					<h1 className="header">Welcome</h1>
					<p>Welcome to the study on movie recommendation.</p>
				</div>

				<Card bg="light">
					<Card.Body>
						<Card.Title>What can you expect?</Card.Title>
						<p>
							This is a study that aims to test a new recommender system for movies. Your participation in
							this study will be valued.
						</p>
						<p>
							It will take you about 10-15 minutes to complete the four steps of the study:
						</p>
						<ol>
							<li>Pre-survey on your preference profile.</li>
							<li>Rate a few movies you are familiar with.</li>
							<li>Interact with the movie recommender system by rating movies and picking a movie from the recommendations</li>
							<li>Complete survey about your experience interacting with the system</li>
						</ol>

						<p>Thanks,<br />
							Research Team</p>

					</Card.Body>
				</Card>
				<div className="jumbotron jumbotron-footer">
					{/*GET  STARTED BUTTON*/}
					<Button variant="primary" size="lg" className="footer-btn"
						onClick={this.displaySurvey}>
						Get started
					</Button>
				</div>

				<Modal show={show} dialogClassName="modal-80w" style={{ zIndex: "2050" }}>
					<Modal.Header>
						<Modal.Title>Consent: taking part in the study</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p style={{ marginBottom: "0" }}><strong>Voluntary Consent</strong></p>
						<p>
							Participation is voluntary, and you have the option to not participate.
						</p>

						<p style={{ marginBottom: "0" }}><strong>Participation Time</strong></p>
						<p>
							It will take you about 15 to 20 minutes to be this study.
						</p>
						<p style={{ marginBottom: "0" }}><strong>Risks and discomforts</strong></p>
						<p>
							We do not know of any risks or discomforts to you in this research study.
						</p>

						<p style={{ marginBottom: "0" }}><strong>Possible Benefits</strong></p>
						<p>
							This study will help create technology that will help users leverage
							recommendations to explore, learn, and develop their unique personal
							preferences.
						</p>

						<p style={{ marginBottom: "0" }}><strong>Incentives</strong></p>
						<p>
							You must complete all step in the study to get a compensation of $2.75.
						</p>

						<p style={{ marginBottom: "0" }}><strong>Protection of Privacy and Confidentiality</strong></p>
						<p>
							The results of this study may be published in scientific journals, professional
							publications, or educational presentations.
							<br /><br />
							The information collected during the study could be used for future research
							studies or distributed to another investigator for future research studies
							without additional informed consent from the participants or legally
							authorized representative. No identifiable information will be collected during
							the study.
						</p>

						<p style={{ marginBottom: "0" }}><strong>Contact Information</strong></p>
						<p>
							If you have any questions or concerns about your rights in this research study,
							please contact the Clemson University Office of Research Compliance (ORC) at
							864-656-0636 or <a href="mailto:irb@clemson.edu">irb@clemson.edu</a>. If you are
							outside of the Upstate South Carolina area, please use the ORC's toll-free number,
							866-297-3071. The Clemson IRB will not be able to answer some study-specific
							questions. However, you may contact the Clemson IRB if the research staff cannot
							be reached or if you wish to speak with someone other than the research staff.
							If you have any study related questions or if any problem arise, please contact
							Sushmita Khan at <a href="mailto:sushmik@clemson.edu">sushmik@clemson.edu</a>.
						</p>

						<p style={{ marginBottom: "0" }}><strong>Consent</strong></p>
						<p>
							By participation in the study, you indicate that you have read the information
							wirtten abovem been allowed to ask any questions, and you are voluntarily
							choosing to take part in this research. You do not give up any legal rights by
							taking part in this research study.
						</p>
						<Form.Check
							label="I have read and understand this study and my rights above. My participation in this
                            study is voluntary. I voluntarily agree to participate in this research study."
							onChange={(evt) => this.setState({ disabled: !evt.target.checked })} />

					</Modal.Body>
					<Modal.Footer>
						<Link to="/exit">
							<Button variant="secondary">
								Exit
							</Button>
						</Link>
						<Button variant="primary" disabled={this.state.disabled && !this.state.loading}
							onClick={this.createNewUser}>
							{!this.state.loading ? 'Continue'
								:
								<>
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									Loading...
								</>
							}
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default withRouter(WelcomePage);