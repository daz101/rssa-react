import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {API, Movie} from "../constants";
import Spinner from 'react-bootstrap/Spinner'

const responsive = [
	{ breakpoint: 4000, cols: 12, rows: 5, gap: 9, loop: true },
	{ breakpoint: 3000, cols:  8, rows: 3, gap: 9, loop: true },
	{ breakpoint: 1200, cols:  7, rows: 3, gap: 9, loop: true },
	{ breakpoint: 1000, cols:  6, rows: 3, gap: 3, loop: true },
	{ breakpoint:  800, cols:  5, rows: 3, gap: 3, loop: true },
	{ breakpoint:  600, cols:  3, rows: 3, gap: 3, loop: true },
	{ breakpoint:  464, cols:  2, rows: 3, gap: 3, loop: true }
];

class MovieGrid extends Component {

	constructor(props) {
		super(props);
		this.state = {
			movies_: [],
			visited: [],
			currentPage: 0,
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
		axios
			.get(API, {params: {limit: 36, page: curr+1}})
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

	updateVisited = () => {
		const randomCount = 5;
		let randomMovies = [];
		if (this.state.visited.length <= randomCount) {
			randomMovies = this.getRandomMovies(this.state.movies_, randomCount);

			this.setState({
				visited: randomMovies
			});
		}
	}

	movieList() {
		return this.state.movies.map(currentmovie => {
			return (
				<Movie
					movie={currentmovie}
					// deleteMovie={this.deleteMovie}
					key={currentmovie._id}
				/>
			);
		});
	}

	onSubmit(e) {
		e.preventDefault();
		// const exercise = {
		//   username: this.state.username,
		//   description: this.state.description,
		//   duration: this.state.duration,
		//   date: this.state.date
		// };
		axios
			.get(API + this.state.mId)
			.then(response => {
				this.setState({movies: response.data});
			})
			.catch(error => {
				console.log(error);
			});
	}

	renderNextSet(){
		console.log("Next Button Clicked");
		let curr = this.state.currentPage;
		curr += 1;
		this.setState({
			currentPage: curr
		});
		if(curr%2!=0){
			this.getMovies();
		}
	}

	renderPrevSet(){
		console.log("Previous Button Clicked");
		let curr = this.state.currentPage;
		if(curr > 0){
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
		let vstd = vstdLst.includes(movieid);
		if (!vstd) {
			vstdLst.push(movieid);
			this.setState({
				movies_: ratedItm,
				visited: vstdLst
			});
			this.props.handler();
		} else {
			this.setState({
				movies_: ratedItm
			})
		}
	}

	getRandomMovies = (allMovies, randomCount) => {
		const randomMovies = [];
		for (let i = 0; i < randomCount; i++) {
			const randIdx = Math.floor(Math.random() * allMovies.length);
			const randItm = allMovies.splice(randIdx, 1)[0];
			randomMovies.push(randItm);
		}
		return randomMovies;
	}

	render() {
		if (this.state.movies_.length > 0) {
			let startIdx = this.state.currentPage*18;
			return (
				<div className="grid-layout" style={{minWidth: "500px", maxWidth: "1200px", margin: "auto", display: "flex"}}>
					<div style={{paddingTop: "270px", marginRight: "18px"}}>
						<Button disabled={startIdx == 0} variant="primary" style={{width: "54px", height: "270px"}} onClick={this.renderPrev}>
							&lt;
						</Button>
					</div>
					<div className="grid-container">
						{this.state.movies_.slice(startIdx, startIdx+18).map(currentMovie => (
							<div id={"TN_" + currentMovie.movie.rssa_idc} key={"TN_" + currentMovie.movie.rssa_id} 
								className="movieCardContainer grid-item" style={{position: "relative"}}>
								<div  className="container"
									style={{backgroundImage: "url(" + currentMovie.movie.poster + "), url('/default_movie_icon.svg')",
									backgroundSize: "100% auto"}}>
									<div className={"overlay"}>
										<div className="star-div">
											<StarRatings
												rating={currentMovie.rating}
												starRatedColor="rgb(252,229,65)"
												starHoverColor="rgb(252,229,65)"
												starDimension="18px"
												starSpacing="1px"
												changeRating={this.changeRating}
												numberOfStars={5}
												name={currentMovie.movie.movie_id}/>
										</div>
									</div>
								</div>
								<div className="text" style={{position: "absolute"}}>
									{currentMovie.movie.title + " (" + currentMovie.movie.year + ")"}
								</div>
							</div>
						))}
					</div>
					<div style={{paddingTop: "270px", marginLeft: "18px"}}>
						<Button variant="primary" style={{width: "54px", height: "270px"}} onClick={this.renderNext}>
							&gt;
						</Button>
					</div>
				</div>
			);
		} else {
			return (
				<div style={{minWidth: "300px", minHeight: "300px"}}>
					<Spinner animation="border" role="status" style={{margin: "3em 50%", width: "54px", height: "54px"}}/>
				</div>
				);
		}
	}
}

export default MovieGrid;