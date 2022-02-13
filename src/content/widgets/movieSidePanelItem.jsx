import React, { Component } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class SidePanelItem extends Component {

	render() {
		// movie.movie_id

		// let pick  = this.props.pick || false;
		// let selected = this.props.selectedid;
		// const selectClassStr = 'list-group-item-selected';
		// const listClassStr = 'list-group-item';
		const movie= this.props.movie;
		let itemClassStr = '';
		let btnVariant = '';
		let btnText = '';
		console.log('we check', this.props.selectedid, movie.movie_id)
		if (this.props.selectedid === movie.movie_id){
			itemClassStr = 'list-group-item-selected';
			btnVariant = 'success';
			btnText = 'Selected';
		} else {
			itemClassStr = 'list-group-item';
			btnVariant = 'secondary';
			btnText = 'Choose';
		}
		console.log('wee');
		return <>
		<ListGroup.Item as="li"
							// (selected === movie.movie_id ? selectClassStr : listClassStr) +
								className={itemClassStr + " d-flex justify-content-between align-items-center"}
								onMouseEnter={() => this.props.hoverHandler(true, movie)}
							>
								<div style={{ position: "relative", boxSizing: "border-box", display: "inline-block", verticalAlign: "middle"}}>
									<p style={{marginBottom: "0", marginTop: "0.25rem"}}> {movie.title} </p>
								</div>
								{/* <div className="rating"> */}
								{ !this.props.pick ? 
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
									{/* <input type="radio" name="movie-select" id={'ID_'+movie.movie_id} 
										onChange={this.onValueChange} value={movie.movie_id} /> */}
										<Button variant={btnVariant} size="md" style={{ float: 'right' }} 
											onClick={this.props.selectStateHandler} value={movie.movie_id} >
											{btnText}
										</Button>
									</div>
								}
								{/* </div> */}
							</ListGroup.Item>
		</>;
	}
}

export default SidePanelItem;