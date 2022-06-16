import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class SidePanelItemRate extends Component {

	render() {
		const movie = this.props.movie;

		return <>
			<ListGroup.Item as="div"
				className={"d-flex justify-content-between align-items-center"}
				onMouseEnter={(evt) => this.props.hoverHandler(evt, true, movie, "enter")}
			>
				<div style={{
					position: "relative", boxSizing: "border-box", width: "63%",
					display: "inline-block", verticalAlign: "middle"
				}}>
					<p style={{ marginBottom: "0", marginTop: "0.25rem" }}>
						{movie.title + " (" + movie.year + ")"}
					</p>
				</div>
				<StarRatings
					starRatedColor="rgb(252,229,65)"
					rating={movie.rating}
					starHoverColor="rgb(252,229,65)"
					starDimension="1.25em"
					starSpacing="0.25px"
					changeRating={this.props.ratingsHandler}
					numberOfStars={5}
					name={movie.movie_id} />
			</ListGroup.Item>
		</>;
	}
}

export default SidePanelItemRate;