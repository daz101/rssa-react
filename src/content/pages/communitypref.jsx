import { Component } from 'react';
import { Button, Col, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import withRouter from '../hooks/withRouter';
import ContinuousCoupled from '../widgets/continuousCoupled';
import ContinuousDecoupled from '../widgets/continuousDecoupled';
import DiscreteCoupled from '../widgets/discreteCoupled';
import DiscreteDecoupled from '../widgets/discreteDecoupled';
import PreferenceSidebar from '../widgets/preferenceSideBar';



class CommunityPreference extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeMovie: undefined,
			show: false,
			activetag: ''
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

	updatePanel = (evt, activetag) => {
		this.setState({
			activetag: activetag
		});
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
				<Navbar bg="light">
					<Navbar.Brand style={{ marginLeft: "1.3em" }}>
						Pref Viz
					</Navbar.Brand>
					<Nav>
						<Nav.Link onClick={evt => this.updatePanel(evt, 'cc')}>Continuous Coupled</Nav.Link>
						<Nav.Link onClick={evt => this.updatePanel(evt, 'cd')}>Continuous Decoupled</Nav.Link>
						<Nav.Link onClick={evt => this.updatePanel(evt, 'dc')}>Discrete Coupled</Nav.Link>
						<Nav.Link onClick={evt => this.updatePanel(evt, 'dd')}>Discrete Decoupled</Nav.Link>
					</Nav>
				</Navbar>
				<div>
					<Row className="g-0">
						<Col sm={8}>
							{this.state.activetag === 'cc' && <ContinuousCoupled ratings={ratings} movies={movies}
								onClickHandler={this.handleClickEvent} />}
							{this.state.activetag === 'cd' && <ContinuousDecoupled ratings={ratings} movies={movies}
								onClickHandler={this.handleClickEvent} />}
							{this.state.activetag === 'dc' && <DiscreteCoupled ratings={ratings} movies={movies}
								onClickHandler={this.handleClickEvent} />}
							{this.state.activetag === 'dd' && <DiscreteDecoupled ratings={ratings} movies={movies}
								onClickHandler={this.handleClickEvent} />}
							{this.state.activetag === '' && (
								<div className="viewdiv empty">
									<h3 style={{ textAlign: "center", padding: "3em"}}>
										Please select a preference visualization
									</h3>
								</div>
							)}
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