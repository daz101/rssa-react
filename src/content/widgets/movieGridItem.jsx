import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';


class MovieGridItem extends Component {

	render() {

		let currentMovie = this.props.movieItem;
		let changeRating = this.props.ratingCallback;

		let containerClass = currentMovie.rating > 0 ? 'container-visited' : '';
		let starDivClass = currentMovie.rating > 0 ? 'star-div-rated' : 'star-div';


		return (
			<div id={"TN_" + currentMovie.rssa_id}
				className={"grid-item " + containerClass} style={{
					backgroundImage: "url(" + currentMovie.poster + "), url('/default_movie_icon.svg')",
				}}>
				<div className="overlay">
					<div className={starDivClass}>
						<StarRatings
							rating={currentMovie.rating}
							starRatedColor="rgb(252,229,65)"
							starHoverColor="rgb(252,229,65)"
							starDimension="18px"
							starSpacing="1px"
							changeRating={changeRating}
							numberOfStars={5}
							name={currentMovie.movie_id} />
					</div>
				</div>
				<div className="grid-item-label" style={{ position: "absolute" }}>
					{currentMovie.title + " (" + currentMovie.year + ")"}
				</div>
			</div>
		);
	}
}

export default MovieGridItem;