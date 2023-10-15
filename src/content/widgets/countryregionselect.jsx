import { Component } from "react";
import { Country, State } from "country-state-city";
import { Form } from "react-bootstrap";


export class CountrySelect extends Component {

	constructor(props) {
		super(props);
		this.state = {
			active: undefined
		}
	}

	handleChange(evt) {
		let countryCode = evt.target.value;
		const country = Country.getCountryByCode(countryCode);
		this.setState({ active: country }, () => {
			if (this.props.onChange) {
				this.props.onChange(this.state.active);
			}
		})
	}

	render() {

		const countries = Country.getAllCountries();
		const activeCountry = this.state.active !== undefined ? this.state.active.isoCode : '-';

		return (
			<Form.Select onChange={evt => this.handleChange(evt)} value={activeCountry} style={this.props.style}>
				<option value='-'> -- </option>
				{countries.map((country, i) =>
					<option value={country.isoCode} key={country.isoCode}>{country.flag}  {country.name}</option>
				)}
			</Form.Select>
		)
	}

}

export class RegionSelect extends Component {

	constructor(props) {
		super(props);
		this.state = {
			acountry: undefined,
			aregion: undefined
		}
	}

	handleChange(evt, country) {
		let regionCode = evt.target.value;
		const region = State.getStateByCodeAndCountry(regionCode, country.isoCode);
		this.setState({ acountry: country, aregion: region }, () => {
			if (this.props.onChange) {
				this.props.onChange(this.state.aregion);
			}
		})
	}

	render() {

		let country = this.props.country;
		const states = country != null ? State.getStatesOfCountry(country.isoCode) : [];

		return (
			<Form.Select onChange={evt => this.handleChange(evt, country)} style={this.props.style}>
				{
					states.length > 0 ? states.map(state =>
						<option key={state.isoCode} value={state.isoCode}>{state.name}</option>
					) : <option> -- </option>
				}
			</Form.Select>
		)
	}
}