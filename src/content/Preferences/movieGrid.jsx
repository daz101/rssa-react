import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
		<img src={props.movie.poster} alt={props.movie.title} width="100" />
	  </td>
	</tr>
  );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

class MovieGrid extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			movies: [],
			movies_: [],
			visited: []
		}
	}

	componentDidMount() {
		var API = "";
		var movie_map = [];
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
			  },
			this.setState({movies: response.data,
							movies_: movie_map})
			  );
		  })
		  .catch(error => {
			console.log(error);
		  });
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
	
	onChangeMovieId(e) {
		  console.log("onChangeMovieId");
		  console.log(e);
		this.setState({
		  mId: e.target.value
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
			this.setState({ movies: response.data});
		  })
		  .catch(error => {
			console.log(error);
		  });
	} 
	
	// changeRating( newRating ) {
	// 	console.log(newRating);
	// 	// console.log(currentmovie);
	// 	this.setState({
	// 	  rating: newRating
	// 	});
	// }
	
	changeRating = (newRating, movieid) =>{
		console.log(movieid);
		console.log(this.state.movies_[movieid]);
		console.log(newRating);
		this.setState({
		  rating: newRating
		});
		this.props.handler();
	}

	getRandomMovies = () => {
		let allMovies = this.state.movies_;
		const randomCount = 5;

		let movieMap = {};
		const randomMovies = [];
		for (let i = 0; i < randomCount; i++){
			const randIdx = Math.floor(Math.random() * allMovies.length);
			const randItm = allMovies.splice(randIdx, 1)[0];
			// randomMovies[randItm._id] = randItm;
			randomMovies.push(randItm);
			// this.setState({
			// 	visited: randomMovies
			// });
			movieMap[randItm.movie._id] = randItm;
			console.log(randItm);
		}
		console.log(movieMap);
		return randomMovies;
	}

	getRandomMovie = () => {
		let allMovies = this.state.movies_;
		const randomCount = 5;

		const randIdx = Math.floor(Math.random() * allMovies.length);
		return allMovies.splice(randIdx, 1)[0];
	}

	removeItem = (movieID) => {
		console.log(movieID);
	}

    render() {
		if (this.state.movies_.length > 0){
			let randomMovies = [];
			if (this.state.visited.length <= 5){
				randomMovies = this.getRandomMovies();

			console.log(randomMovies);
			} else {
				randomMovies = this.state.visited;
			}
			console.log(randomMovies);
			return (
				<div>
					<Carousel  
					additionalTransfrom={0}
					arrows
					autoPlaySpeed={3000}
					centerMode={true}
					className=""
					containerClass="container-with-dots"
					dotListClass=""
					draggable
					focusOnSelect={false}
					infinite
					keyBoardControl
					minimumTouchDrag={80}
					renderButtonGroupOutside={false}
					renderDotsOutside={false}
					responsive={responsive}		
					showDots={false}
					sliderClass=""
					slidesToSlide={1}
					swipeable
					itemClass="carousel-item-padding-0-px">
					{randomMovies.map(currentmovie => (
						<div class="container"  key={currentmovie.movie._id}>
							
							<img id={"TN_"+currentmovie.movie._id} src={currentmovie.movie.poster} className="imageTrans"/>
								<div class="star-div">
									<StarRatings
										rating={currentmovie.rating}
										starRatedColor="rgb(252,229,65)"
										starHoverColor="rgb(252,229,65)"
										starDimension="27px"
										starSpacing="3px"
										changeRating={this.changeRating}
										numberOfStars={5}
										name={currentmovie.movie._id}/>
								</div>
								<div class="text">
									{currentmovie.movie.title}
								</div>									
						</div>
						// <div>
						// <img src={currentmovie.movie.poster} className="imageTrans"/>
						// </div>
					))}
					</Carousel>
				</div>
			);
		} else {
			return (<div></div>);
		}
    }
}

export default MovieGrid;