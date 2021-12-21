import axios from "axios";
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import StarRatings from 'react-star-ratings';
import { API } from "../constants";


class MovieGrid extends Component {
	itemsPerPage = 18;

	constructor(props) {
		super(props);
		this.state = {
			movies_: [],
			visited: [],
			currentPage: 0
		}
		this.renderNext = this.renderNextSet.bind(this);
		this.renderPrev = this.renderPrevSet.bind(this);
	}

	componentDidMount() {
		this.getMovies();
	}

	getMovies() {
		let movie_map = this.state.movies_;
		let curr = this.state.currentPage;
		console.log(this.itemsPerPage);
		// We prefetch the next page; every query is two pages of items
		axios
			.get(API, { params: { limit: this.itemsPerPage * 2, page: curr + 1 } })
			.then(response => {
				response.data.map(movie => {
					movie_map.push({
						"movie": movie,
						"rating": 0
					});
				});
				this.setState({
					movies_: movie_map
				})
			})
			.catch(error => {
				console.log(error);
			});
	}

	renderNextSet() {
		console.log("Next Button Clicked");
		let curr = this.state.currentPage;
		curr += 1;
		this.setState({
			currentPage: curr
		});
		if (curr % 2 != 0) {
			this.getMovies();
		}
	}

	renderPrevSet() {
		console.log("Previous Button Clicked");
		let curr = this.state.currentPage;
		if (curr > 0) {
			curr -= 1;
			this.setState({
				currentPage: curr
			});
		}
	}

	changeRating = (newRating, movieid) => {
		let movieLst = [...this.state.movies_];
		let vstdLst = [...this.state.visited];
		let ratedItm = movieLst.map(movieItm => (
			movieItm.movie.movie_id === movieid ? {
				...movieItm, rating: newRating
			} : movieItm
		));
		let isNew = !vstdLst.some(item => item.item_id == movieid);
		if (isNew) {
			vstdLst.push({ "item_id": movieid, "rating": newRating });
		} else {
			vstdLst = vstdLst.map(movieItm => (
				movieItm.item_id === movieid ? {
					...movieItm, rating: newRating
				} : movieItm
			));
		}
		this.setState({
			movies_: ratedItm,
			visited: vstdLst
		});
		this.props.handler(vstdLst, isNew);
	}

	render() {
		if (this.state.movies_.length > 0) {
			let startIdx = this.state.currentPage * this.itemsPerPage;
			return (
				<div className="grid-layout" style={{ minWidth: "500px", maxWidth: "1200px", margin: "auto", display: "flex" }}>
					<div style={{ paddingTop: "270px", marginRight: "18px" }}>
						<Button disabled={startIdx == 0} variant="primary" style={{ width: "54px", height: "270px" }} onClick={this.renderPrev}>
							&lt;
						</Button>
					</div>
					<div className="grid-container">
						{this.state.movies_.slice(startIdx, startIdx + this.itemsPerPage).map(currentMovie => (
							<div id={"TN_" + currentMovie.movie.rssa_idc} key={"TN_" + currentMovie.movie.rssa_id}
								className="movieCardContainer grid-item" style={{ position: "relative" }}>
								<div className="container"
									style={{
										backgroundImage: "url(" + currentMovie.movie.poster + "), url('/default_movie_icon.svg')",
										backgroundSize: "100% auto"
									}}>
									<div className="overlay">
										<div className="star-div">
											<StarRatings
												rating={currentMovie.rating}
												starRatedColor="rgb(252,229,65)"
												starHoverColor="rgb(252,229,65)"
												starDimension="18px"
												starSpacing="1px"
												changeRating={this.changeRating}
												numberOfStars={5}
												name={currentMovie.movie.movie_id} />
										</div>
									</div>
								</div>
								<div className="text" style={{ position: "absolute" }}>
									{currentMovie.movie.title + " (" + currentMovie.movie.year + ")"}
								</div>
							</div>
						))}
					</div>

					<div style={{ paddingTop: "270px", marginLeft: "18px" }}>
						<Button variant="primary" style={{ width: "54px", height: "270px" }} onClick={this.renderNext}>
							&gt;
						</Button>
					</div>
				</div>
			);
		} else {
			return (
				<div style={{ minWidth: "300px", minHeight: "300px" }}>
					<Spinner animation="border" role="status" style={{ margin: "3em 50%", width: "54px", height: "54px" }} />
				</div>
			);
		}
	}
}

export default MovieGrid;