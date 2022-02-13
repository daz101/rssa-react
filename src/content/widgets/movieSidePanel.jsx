import StarRatings from 'react-star-ratings';
import React, { Component } from "react";
import {ListGroup, Button} from "react-bootstrap";
import SidePanelItem from './movieSidePanelItem';

class MovieSidePanel extends Component {

	changeRating = (newRating, movieid) => {
		let panelid = this.props.id;
		this.props.ratingHandler(panelid, newRating, movieid);
	}

	onValueChange = (event) => {
		console.log(event);
		let movieid = event.target.value;
		console.log(movieid);
		this.props.selectionHandler(movieid);
	}

	render() {

		return (
			<div className="col-sm-4 gy-sm-0">
				<div className="d-flex align-items-center justify-content-center" style={{ height: "81px", 
					textAlign: "center", borderRadius: "0.3rem 0.3rem 0 0", backgroundColor: "#e9ecef"
				}}>
					<h5>{this.props.panelTitle}</h5>
				</div>
					<ListGroup as="ul">
						{this.props.movieList.map((movie) => (
							<SidePanelItem key={movie.rssa_id} movie={movie} pick={this.props.pick || false}
								selectedid={this.props.selectedid}
								hoverHandler={this.props.hoverHandler}
								ratingsHandler={this.changeRating}
								selectStateHandler={this.onValueChange}/>
						))}
					</ListGroup>
			</div>
		);
	}
}

export default MovieSidePanel