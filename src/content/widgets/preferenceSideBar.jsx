import React, { Component } from 'react';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import { HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons';



class PreferenceSidebar extends Component {

	getPreferenceSummmary(userscore, commscore) {
		/*
			'Both you and your community like this movie.'
			'Both you and your community dislike this movie.'
			'Both you and your community are indifferent to this movie.'

			'You like this movie but your community dislikes this movie.'
			'You like this movie but your community is indifferent to this movie.'

			'You dislike this movie but your community likes this movie.'
			'You dislike this movie but your community is indifferent to this movie.'

			'You are indifferent to this movie but your community likes this movie.'
			'You are indifferent to this movie but your community dislikes this movie.'
		*/

		let userPolarity = this.getPreferencePolarity(userscore);
		let commPolarity = this.getPreferencePolarity(commscore);

		if (userPolarity === 'indifferent to') {
			userPolarity = 'are ' + userPolarity;
		}

		if (commPolarity === 'indifferent to') {
			commPolarity = 'is ' + commPolarity;
		}

		if (userPolarity === commPolarity) {
			return 'Both you and your community ' + userPolarity + ' this movie.';
		} else {
			return 'You ' + userPolarity + ' this movie but your community ' + commPolarity + ' this movie.';
		}
	}

	getPreferencePolarity(score) {
		if (score > 3.5) { // likes
			return 'like';
		} else if (score < 2.5) { // dislikes
			return 'dislike';
		}
		else { // indifferent
			return 'indifferent to';
		}
	}

	render() {

		let activeMovie = this.props.activeMovie;
		let isShown = this.props.show;
		let prefsummary = '';
		if (activeMovie){
			prefsummary = this.getPreferenceSummmary(activeMovie.user_score, activeMovie.community_score);
		}

		return (
			<div id="moviePosterPreview" style={{marginTop: "27px"}}>
				{isShown && (activeMovie != null) ? (
					<Card bg="dark" text="white" style={{
						backgroundColor: '#333', borderColor: '#333'
					}}>
						<Card.Body style={{ height: '700px' }}>
							<Card.Img variant="top" className="d-flex mx-auto d-block img-thumbnail"
								src={activeMovie.poster} alt={"Poster of the movie " +
									activeMovie.title}
								style={{ maxHeight: "54%", minHeight: "54%", width: "auto" }} />
							<Card.Title style={{ marginTop: "0.5rem" }}>
								{activeMovie.title}
							</Card.Title>
							<Container className="overflow-auto" style={{ height: "18%" }}>
								<Card.Text>
									{activeMovie.description}
								</Card.Text>
							</Container>
							<Row style={{backgroundColor: "white"}}>
								<Card.Text style={{color: "black", textAlign: "center"}}>
									{prefsummary}
								</Card.Text>
							</Row>
							<Row className="justify-content-md-center" style={{marginTop: "27px"}}>
								<Col md="auto">
									<Button variant="outline-light" size="lg">
										<HandThumbsUp fill="#00ff00" width="45" height="45" />
									</Button>
								</Col>
								<Col md="auto">
									<Button variant="outline-light" size="lg">
										<HandThumbsDown fill="#ff0000" width="45" height="45" />
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				) : (
					<Card bg="dark" text="white" style={{
						backgroundColor: '#333', borderColor: '#333'
					}}>
						<Card.Body style={{ height: '700px' }}>
							<p>Click on the movie post icon to see more details and rate them.</p>
						</Card.Body>
					</Card>)
				}
			</div>
		);
	}
}

export default PreferenceSidebar;