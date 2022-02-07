import StarRatings from 'react-star-ratings';
import React, { Component } from "react";

class MovieSidePanel extends Component {

	changeRating = (newRating, movieid) => {
		let panelid = this.props.id;
		this.props.ratingHandler(panelid, newRating, movieid);
	}

	render() {
		return (
			<div className="col-sm-4">
				<div style={{ minHeight: "102px", maxHeight: "102px", textAlign: "center", 
					padding: "1.8em", fontSize: "1.2em", borderRadius: "3px", backgroundColor: "#e9ecef"
				}}>
					<strong>{this.props.panelTitle}</strong>
				</div>
					<ol className="list-group">
						{this.props.movieList.map((movie) => (
							<li key={movie.movie_id}
								className="list-group-item d-flex justify-content-between align-items-center"
								onMouseEnter={() => this.props.hoverHandler(true, movie)}
							// onMouseLeave={() => this.props.handler(false, null)}
							>
								<b> {movie.title} </b>
								<div className="rating">
									<StarRatings
										starRatedColor="rgb(252,229,65)"
										rating={movie.rating}
										starHoverColor="rgb(252,229,65)"
										starDimension="18px"
										starSpacing="1px"
										changeRating={this.changeRating}
										numberOfStars={5}
										name={movie.movie_id} />
								</div>
							</li>
						))}
					</ol>
			</div>
		);
	}
}

export default MovieSidePanel