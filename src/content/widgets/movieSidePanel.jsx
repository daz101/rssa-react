import StarRatings from 'react-star-ratings';
import React, { Component } from "react";
import {ListGroup} from "react-bootstrap";

class MovieSidePanel extends Component {

	changeRating = (newRating, movieid) => {
		let panelid = this.props.id;
		this.props.ratingHandler(panelid, newRating, movieid);
	}

	render() {
		return (
			<div className="col-sm-4">
				<div style={{ minHeight: "102px", maxHeight: "102px", textAlign: "center", 
					padding: "1.8em", fontSize: "1.2em", borderRadius: "0.3rem 0.3rem 0 0", backgroundColor: "#e9ecef"
				}}>
					<strong>{this.props.panelTitle}</strong>
				</div>
					<ListGroup as="ul">
						{this.props.movieList.map((movie) => (
							<ListGroup.Item as="li" key={movie.movie_id}
								className="d-flex justify-content-between align-items-start"
								onMouseEnter={() => this.props.hoverHandler(true, movie)}
							>
								<p> {movie.title} </p>
								<div className="rating">
									<StarRatings
										starRatedColor="rgb(252,229,65)"
										rating={movie.rating}
										starHoverColor="rgb(252,229,65)"
										starDimension="22px"
										starSpacing="1px"
										changeRating={this.changeRating}
										numberOfStars={5}
										name={movie.movie_id} />
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
			</div>
		);
	}
}

export default MovieSidePanel