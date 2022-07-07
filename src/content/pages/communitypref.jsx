import { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import withRouter from '../hooks/withRouter';
import PreferenceGraphD3 from '../widgets/PreferenceGraphD3';
import PreferenceSidebar from '../widgets/preferenceSideBar';


class CommunityPreference extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeMovie: undefined,
			show: false
		}
		this.handleClickEvent = this.handleClickEvent.bind(this);
	}

	handleClickEvent(show, data) {
		console.log(show);
		this.setState({
			activeMovie: data,
			show: show
		})
	}

	render() {
		let movies = this.props.router.location.state.movies;
		let ratings = this.props.router.location.state.ratings;

		return (
			<>
				<div className="jumbotron">
					<h1 className="header">Rating Movies</h1>
					<p> Rate {this.moviesRatingCount} movies from the gallery below.</p>
				</div>
				<div>
					<Row className="g-0">
						<Col sm={8}>
							<PreferenceGraphD3 ratings={ratings} movies={movies}
								onClickHandler={this.handleClickEvent} />
						</Col>
						<Col sm={4}>
							<PreferenceSidebar activeMovie={this.state.activeMovie}
								show={this.state.show} />
						</Col>
					</Row>
				</div>
				<div className="jumbotron jumbotron-footer">
					<Link to="/exit">
						<Button className="footer-btn" variant="primary" size="lg">
							Next
						</Button>
					</Link>
				</div>
			</>
		);
	}
}


export default withRouter(CommunityPreference);