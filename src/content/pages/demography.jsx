import axios from 'axios';
import { Component } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import withRouter from '../hooks/withRouter';
import { API } from '../utils/constants';
import { CountrySelect, RegionSelect } from '../widgets/countryregionselect';


class DemographicInfoPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recs: this.props.router.location.state.recs,
			ratings: this.props.router.location.state.ratings,
			userid: this.props.router.location.state.userid,
			pageid: this.props.router.location.state.pageid + 1,
			selectedmovie: this.props.router.location.state.selectedmovie,
			starttime: undefined,
			userResponded: false,
			age: -1,
			education: -1,
			race: [],
			gender: -1,
			country: undefined,
			region: undefined,
			customRace: false,
			loading: false
		};

		this.updateSurvey = this.updateSurveyResponse.bind(this);
	}

	componentDidMount() {
		this.setState({
			starttime: new Date()
		});
	}

	updateSurveyResponse() {
		this.setState({
			loading: true
		});

		const startime = this.state.starttime;
		const endtime = new Date();
		const pageid = this.state.pageid;
		const userid = this.state.userid;
		const age = this.state.age;
		const education = this.state.education;
		const country = this.state.country;
		const region = this.state.region || '';
		const gender = this.state.gender;
		const customGen = gender === 4;
		const genText = this.state.genText;
		const race = this.state.race;
		const customRac = this.state.customRace || false;
		const racText = this.state.racText;

		axios.put(API + 'add_survey_response', {
			pageid: pageid,
			userid: userid,
			starttime: startime.toUTCString(),
			endtime: endtime.toUTCString(),
			response: {
				demography: {
					age: age,
					country: country.name + ':' + region.name,
					gender: gender,
					race: race,
					education: education,
					textgen: genText === undefined || !customGen ? '' : genText,
					textrac: racText === undefined || !customRac ? '' : racText
				}
			}
		})
			.then(response => {
				if (response.status === 200) {
					this.setState({
						updateSuccess: true,
						loading: false
					});
					this.props.progressUpdater(10);
				}
			})
	}

	paramFromEvent = (evt, key) => {
		let val = +evt.target.value;
		if (key === 'race') {
			const checked = evt.target.checked;
			let racval = this.state.race;
			const racidx = racval.indexOf(val);
			!racidx > -1 && !checked ? racval.splice(racidx, 1) : racval.push(val);
			if (racval[0] === 7 && val !== 7) {
				racval.splice(0, 1);
			}
			this.setState({
				[key]: val === 7 && checked ? [7] : racval,
				customRace: (val === 6 && checked)
			});
		} else {
			this.updateParam(val, key);
		}
	}

	updateParam = (val, key) => {
		this.setState({
			[key]: val
		})
	}

	onValueChange = (event, key) => {
		let responseText = event.target.value;
		this.setState({
			[key]: responseText
		});
	}

	render() {
		let buttonDisabled = !(this.state.gender > -1 && this.state.age > -1 &&
			this.state.race.length > 0 && this.state.education > -1 && this.state.country);

		let userid = this.state.userid;
		let pageid = this.state.pageid;

		let genderPref = this.state.gender === 4 ? 'text' : 'hidden';
		let buttonVariant = buttonDisabled ? 'secondary' : 'primary';
		let customRace = this.state.customRace;
		let race = this.state.race;

		const dest = this.props.dest;

		if (this.state.updateSuccess) {
			return (
				<Navigate to={dest} state={
					{
						completed: true,
						userid: userid,
						pageid: pageid
					}
				}
				/>
			);
		}

		return (
			<>
				<div className="jumbotron">
					<h1 className="header">Thank you for completing the survey.</h1>
					<p>Please fill out the following demographic form.</p>
				</div>

				<Card bg="light">
					<Card.Body>
						<Form.Group className="mb-3">
							<Form.Label>What is your age?</Form.Label>
							<Form.Select variant="outline-secondary" title="Dropdown" id="input-group-dropdown-1"
								onChange={(evt) => this.paramFromEvent(evt, "age")} value={this.state.age}>
								<option value="-1">Please choose an option</option>
								<option value="0">18 - 24 years old</option>
								<option value="1">25 - 29 years old</option>
								<option value="2">30 - 34 years old</option>
								<option value="3">35 - 39 years old</option>
								<option value="4">40 - 44 years old</option>
								<option value="5">45 - 49 years old</option>
								<option value="6">50 - 54 years old</option>
								<option value="7">55+</option>
								<option value="8">Prefer not to say</option>
							</Form.Select>
							<br />
							<Form.Label>What is your gender?</Form.Label>
							<Form.Select variant="outline-secondary" title="Dropdown" id="input-group-dropdown-2"
								onChange={(evt) => this.paramFromEvent(evt, "gender")} value={this.state.gender}>
								<option value="-1">Please choose an option</option>
								<option value="0">Woman</option>
								<option value="1">Man</option>
								<option value="2">Non-binary</option>
								<option value="3">Prefer not to disclose</option>
								<option value="4">Prefer to self-describe</option>
							</Form.Select>
							<Form.Control type={genderPref} style={{ marginTop: "9px" }}
								onChange={(evt) => this.onValueChange(evt, "genText")} />
							<br />
							<Form.Label>Choose one or more races that you consider yourself to be:</Form.Label>
							{
								['White', 'Black or African American', 'Asian', 'Native Hawaiian or Pacific Islander',
									'Hispanic', 'Two or more races', 'Not listed (Please specify)',
									'Prefer not to answer'].map((raceVal, i) => (
										<div key={"race-chck-" + i}>
											<Form.Check type="checkbox" id={"race-chck-" + i}
												label={raceVal} value={i} checked={race.indexOf(i) > -1}
												onChange={(evt) => this.paramFromEvent(evt, "race")} />
											{customRace && i === 6 ?
												<Form.Control type="text" style={{ marginTop: "9px", marginBottom: "9px" }}
													onChange={(evt) => this.onValueChange(evt, "racText")} /> :
												<></>
											}
										</div>
									))
							}
							<br />
							<Form.Label>What is the highest degree or level of education you have completed?</Form.Label>
							<Form.Select variant="outline-secondary" title="Dropdown" id="input-group-dropdown-4"
								onChange={(evt) => this.paramFromEvent(evt, "education")} value={this.state.education}>
								<option value="-1">Please choose an option</option>
								<option value="0">Some high school</option>
								<option value="1">High school</option>
								<option value="2">Some college</option>
								<option value="3">Trade, technical or vocational training</option>
								<option value="4">Associate's degree</option>
								<option value="5">Bachelor's degree</option>
								<option value="6">Master's degree</option>
								<option value="7">Professional degree</option>
								<option value="8">Doctorate</option>
								<option value="9">Prefer not to say</option>
							</Form.Select>
							<br />
							<Form.Label>In which country do you currently reside?</Form.Label>
							<CountrySelect onChange={(country) => this.updateParam(country, "country")} />
							<RegionSelect country={this.state.country}
								onChange={(region) => this.updateParam(region, "region")}
								style={{ marginTop: "9px" }} />
						</Form.Group>
					</Card.Body>
				</Card>
				<div className="jumbotron jumbotron-footer">
					<Button className="footer-btn" variant={buttonVariant} size="lg"
						disabled={buttonDisabled && !this.state.loading}
						onClick={this.updateSurvey}>
						{!this.state.loading ? 'Next'
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
				</div>
			</>
		)
	}
}

export default withRouter(DemographicInfoPage);