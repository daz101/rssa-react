import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import Carousel from 'react-grid-carousel'
import axios from "axios";

const Movie = props => (
	<tr>
		<td>{props.movie.rssa_id}</td>
		<td>{props.movie.movie_id}</td>
		<td>{props.movie.imdb_id}</td>
		<td>{props.movie.title}</td>
		<td>{props.movie.year}</td>
		<td>{props.movie.runtime}</td>
		<td>{props.movie.genre}</td>
		<td>{props.movie.aveRating}</td>
		<td>{props.movie.director}</td>
		<td>{props.movie.writer}</td>
		<td>{props.movie.description}</td>
		<td>{props.movie.cast}</td>
		<td>
			<img src={props.movie.poster} alt={props.movie.title} width="100"/>
		</td>
	</tr>
);

const customArrowRight = ({ isActive }) => (
	<span
	style={{
		position: 'absolute',
		top: 'calc(50% - 17.5px)',
		height: '35px',
		width: '35px',
		background: '#fff',
		'border-radius': '50%',
		'box-shadow': '0 0 5px 0 #0009',
		'z-index': '10',
		cursor: 'pointer',
		'font-size': '10px',
		opacity: '0.6',
		'-webkit-transition': 'opacity 0.25s',
		transition: 'opacity 0.25s',
		left: 'initial',
		right: '5px',
		'margin-left': '3px',
	}}
	/>
);

const responsive = [
	{ breakpoint: 4000, cols: 12, rows: 5, gap: 9, loop: true },
	{ breakpoint: 3000, cols: 8, rows: 3, gap: 9, loop: true },
	{ breakpoint: 1200, cols: 7, rows: 3, gap: 9, loop: true },
	{ breakpoint: 1000, cols: 6, rows: 3, gap: 3, loop: true },
	{ breakpoint: 800, cols: 5, rows: 3, gap: 3, loop: true },
	{ breakpoint: 600, cols: 3, rows: 3, gap: 3, loop: true },
	{ breakpoint: 464, cols: 2, rows: 3, gap: 3, loop: true }
];

class MovieGrid extends Component {

	constructor(props) {
		super(props)
		this.state = {
			movies_: [],
			visited: []
		}
	}
	componentDidMount() {
		let API = "";
		let movie_map = [];
		// let randomMovies = [];
		if (process.env.NODE_ENV === "production") {
			API = "https://movie-mern.herokuapp.com/api/movies/";
		} else {
			API = "http://localhost:5000/api/movies/";
		}
		axios
			.get(API)
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
		if (this.state.visited.length <= 5) {
			this.updateVisted();
		}
	}

	updateVisted = () => {
		const randomCount = 5;
		let randomMovies = [];
		if (this.state.visited.length <= 5) {
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

		console.log(this.state.mId);
		var API = "";
		if (process.env.NODE_ENV === "production") {
			API = "https://movie-mern.herokuapp.com/api/movies/";
		} else {
			API = "http://localhost:5000/api/movies/";
		}
		axios
			.get(API + this.state.mId)
			.then(response => {
				this.setState({movies: response.data});
			})
			.catch(error => {
				console.log(error);
			});
	}

	changeRating = (newRating, movieid) => {
		let movieLst = [...this.state.movies_];
		let vstdLst = [...this.state.visited];
		let ratedItm = movieLst.map(movieItm => (
			movieItm.movie._id === movieid ? {
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
		if (this.state.visited.length > 0) {
			// let visited = this.state.movies_;
			return (
				<div>
					<Carousel
						responsiveLayout={responsive}
						// arrowRight={customArrowRight}
						cols={5} rows={3} gap={3} loop>
						{this.state.movies_.map(currentMovie => (
							<Carousel.Item>
								<div id={"TN_" + currentMovie.movie._id}
									 key={currentMovie.movie._id}
									 className="movieCardContainer">
									<div  className="container"
										 style={{backgroundImage: "url(" + currentMovie.movie.poster + ")"}}>
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
													name={currentMovie.movie._id}/>
											</div>
										</div>
									</div>
									<div className="text">
										{currentMovie.movie.title}
									</div>
								</div>
							</Carousel.Item>
						))}
					</Carousel>
				</div>
			);
		} else {
			return (<div/>);
		}
	}
}

export default MovieGrid;