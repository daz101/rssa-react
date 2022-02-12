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
			<div className="col-sm-4 gy-sm-0">
				<div className="d-flex align-items-center justify-content-center" style={{ height: "81px", 
					textAlign: "center", borderRadius: "0.3rem 0.3rem 0 0", backgroundColor: "#e9ecef"
				}}>
					<h5>{this.props.panelTitle}</h5>
				</div>
					<ListGroup as="ul">
						{this.props.movieList.map((movie) => (
							<ListGroup.Item as="li" key={movie.movie_id}
								className="d-flex justify-content-between align-items-center"
								onMouseEnter={() => this.props.hoverHandler(true, movie)}
							>
								<div style={{ position: "relative", boxSizing: "border-box", display: "inline-block", verticalAlign: "middle"}}>
									<p style={{marginBottom: "0", marginTop: "0.25rem"}}> {movie.title} </p>
								</div>
								{/* <div className="rating"> */}
									<StarRatings
										starRatedColor="rgb(252,229,65)"
										rating={movie.rating}
										starHoverColor="rgb(252,229,65)"
										starDimension="1.25em"
										starSpacing="0.25px"
										changeRating={this.changeRating}
										numberOfStars={5}
										name={movie.movie_id} />
								{/* </div> */}
							</ListGroup.Item>
						))}
					</ListGroup>
			</div>
		);
	}
}

export default MovieSidePanel