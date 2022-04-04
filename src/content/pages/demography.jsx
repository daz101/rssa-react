import axios from 'axios';
import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { API } from '../utils/constants';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


class DemographicInfoPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recs: props.location.state.recs,
			ratings: props.location.state.ratings,
			userid: props.location.state.userid,
			pageid: props.location.state.pageid + 1,
			selectedmovie: props.location.state.selectedmovie,
			starttime: undefined,
			userResponded: false,
			age: undefined,
			education: undefined,
			race: undefined,
			gender: undefined,
			country: undefined,
			region: undefined
		};

		this.updateSurvey = this.updateSurveyResponse.bind(this);
	}

	componentDidMount() {
		this.setState({
			starttime: new Date()
		});
	}

	updateSurveyResponse() {
		let startime = this.state.starttime;
		let endtime = new Date();
		let pageid = this.state.pageid;
		let userid = this.state.userid;
		let userText = this.state.userText;
		let age = this.state.age;
		let country = this.state.country;
		let gender = this.state.gender;
		let race = this.state.race;
		let education = this.state.education;
		let region = this.state.region || '';

		axios.put(API + 'add_survey_response', {
			pageid: pageid,
			userid: userid,
			starttime: startime.toUTCString(),
			endtime: endtime.toUTCString(),
			response: {
				demography: {
					age: age,
					country: country + ':' + region,
					gender: gender,
					race: race,
					education: education,
					textgen: userText === undefined ? '' : userText
				}
			}
		})
			.then(response => {
				if (response.status === 200) {
					this.setState({
						updateSuccess: true
					});
					this.props.progressUpdater(10);
				}
			})
	}

	paramFromEvent = (evt, key) => {
		this.updateParam(evt.target.value, key);
	}

	updateParam = (val, key) => {
		this.setState({
			[key]: val
		})
	}

	onValueChange = (event) => {
		let responseText = event.target.value;
		this.setState({
			userText: responseText
		});
	}

	render() {
		let buttonDisabled = !(this.state.gender && this.state.age &&
			this.state.race && this.state.education && this.state.country);

		let userid = this.state.userid;
		let pageid = this.state.pageid;

		let genderPref = this.state.gender === '4' ? 'text' : 'hidden';
		let buttonVariant = buttonDisabled ? 'secondary' : 'primary';

		if (this.state.updateSuccess) {
			return (
				<Redirect to={{
					pathname: this.props.dest,
					state: {
						completed: true,
						userid: userid,
						pageid: pageid
					}
				}} />
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
								<option>Please choose an option</option>
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
								<option>Please choose an option</option>
								<option value="0">Woman</option>
								<option value="1">Man</option>
								<option value="2">Non-binary</option>
								<option value="3">Prefer not to disclose</option>
								<option value="4">Prefer to self-describe</option>
							</Form.Select>
							<Form.Control type={genderPref} style={{ marginTop: "9px" }} onChange={this.onValueChange} />
							<br />
							<Form.Label>Choose one or more races that you consider yourself to be:</Form.Label>
							<Form.Select variant="outline-secondary" title="Dropdown" id="input-group-dropdown-3"
								onChange={(evt) => this.paramFromEvent(evt, "race")} value={this.state.race}>
								<option >Please choose an option</option>
								<option value="0">White</option>
								<option value="1">Black or African American</option>
								<option value="2">American Indian or Alaskan Native</option>
								<option value="3">Asian</option>
								<option value="4">Native Hawaiian or Pacific Islander</option>
								<option value="5">Hispanic</option>
								<option value="6">Two or more races</option>
								<option value="7">Not listed (Please specify)</option>
								<option value="8">Prefer not to answer</option>
							</Form.Select>
							<br />
							<Form.Label>What is the highest degree or level of education you have completed?</Form.Label>
							<Form.Select variant="outline-secondary" title="Dropdown" id="input-group-dropdown-4"
								onChange={(evt) => this.paramFromEvent(evt, "education")} value={this.state.education}>
								<option>Please choose an option</option>
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
							<CountryDropdown className="form-select" variant="outline-secondary"
								value={this.state.country} onChange={(country) => this.updateParam(country, "country")}
								style={{ cursor: "pointer" }} />
							<RegionDropdown className="form-select" variant="outline-secondary" country={this.state.country}
								value={this.state.region} onChange={(region) => this.updateParam(region, "region")}
								style={{ cursor: "pointer", marginTop: "9px" }} />
						</Form.Group>
					</Card.Body>
				</Card>
				<div className="jumbotron jumbotron-footer">
					<Button className="footer-btn" variant={buttonVariant} size="lg"
						disabled={buttonDisabled}
						onClick={this.updateSurvey}>
						Next
					</Button>
				</div>
			</>
		)
	}
}

export default DemographicInfoPage;