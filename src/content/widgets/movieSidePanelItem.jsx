import React, { Component } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class SidePanelItem extends Component {

	render() {
		const movie = this.props.movie;
		let itemClassStr = '';
		let btnVariant = '';
		let btnText = '';
		
		if (this.props.selectedid === movie.movie_id) {
			itemClassStr = 'list-group-item-selected';
			btnVariant = 'success';
			btnText = 'Selected';
		} else {
			itemClassStr = 'list-group-item';
			btnVariant = 'secondary';
			btnText = 'Choose';
		}
		
		return <>
			<ListGroup.Item as="li"
				className={itemClassStr + " d-flex justify-content-between align-items-center"}
				onMouseEnter={() => this.props.hoverHandler(true, movie)}
			>
				<div style={{ position: "relative", boxSizing: "border-box", display: "inline-block", verticalAlign: "middle" }}>
					<p style={{ marginBottom: "0", marginTop: "0.25rem" }}> {movie.title} </p>
				</div>
				{!this.props.pick ?
					<StarRatings
						starRatedColor="rgb(252,229,65)"
						rating={movie.rating}
						starHoverColor="rgb(252,229,65)"
						starDimension="1.25em"
						starSpacing="0.25px"
						changeRating={this.props.ratingsHandler}
						numberOfStars={5}
						name={movie.movie_id} />
					:
					<div>
						<Button variant={btnVariant} size="md" style={{ float: 'right' }}
							onClick={this.props.selectStateHandler} value={movie.movie_id} >
							{btnText}
						</Button>
					</div>
				}
			</ListGroup.Item>
		</>;
	}
}

export default SidePanelItem;