import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";

class MovieSidePanel extends Component {

	render() {
		const ratingChanged = (newRating) => {
			console.log(newRating);
		};
		return (
			<div className="col-sm-4">
				<ul className="list-group">
					<form onSubmit={this.handleSubmit}>
						<li className="list-group-item list-group-item-dark d-flex justify-content-between
                                align-items-center">
							<strong>{this.props.panelTitle}</strong>
						</li>
						<ol className="list-group">
							{this.props.movieList.map((movie) => (
								<li key={movie.movie_id}
									className="list-group-item d-flex justify-content-between align-items-center"
									onMouseEnter={() => this.props.handler(true, movie)}
									onMouseLeave={() => this.props.handler(false, null)}
								>
									<b> {movie.title} </b>
									<div className="rating">
										<ReactStars
											count={5}
											onChange={ratingChanged}
											size={24}
											activeColor="#ffd700"/>
									</div>
								</li>
							))}
						</ol>
					</form>
				</ul>
			</div>
		);
	}
}

export default MovieSidePanel

