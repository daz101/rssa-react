import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
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
	  {/* <td>{props.movie.description}</td> */}
	  <td>{props.movie.cast}</td>
	  <td>
		<img src={props.movie.poster} alt={props.movie.title} width="100" />
	  </td>
	</tr>
  );

class MovieGrid extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
		  rating: 0,
		  movies: [],
		  mId: ""
		}
	  }

	  componentDidMount() {
		var API = "";
		if (process.env.NODE_ENV === "production") {
		  API = "https://movie-mern.herokuapp.com/api/movies/";
		} else {
		  API = "http://localhost:5000/api/movies/";
		}
		axios
		  .get(API)
		  .then(response => {
			this.setState({ movies: response.data });
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
			this.setState({ movies: response.data });
		  })
		  .catch(error => {
			console.log(error);
		  });
	  }

	  
	
	changeRating( newRating ) {
		this.setState({
		  rating: newRating
		});
	  }
	

    render() { 
        return ( 
            <div>
                <div class="movie-block" id="movie_10">
					<div class="container">
						
						{this.state.movies.map(currentmovie => ( 
						<div class="wrapper-block"  key={currentmovie._id}>
						


							<div class="img-block" > 
							
						
					   			<img id="TN_1" src={currentmovie.poster} class="imageTrans"/>
					   
					   			<div class="middle">
					   			<StarRatings
									rating={this.state.rating}
									starRatedColor="rgb(252,229,65)"
									starHoverColor="rgb(252,229,65)"
									starDimension="15px"
									starSpacing="2px"
									changeRating={this.changeRating}
									numberOfStars={5}
									name='rating'/>
									<div class="text"> {currentmovie.title}</div>
								</div>
								
								
							</div>										
						</div> ))}
						 {/*wrapper ending */}
					</div>
				
				</div>
            </div>
         );
    }
}
 
export default MovieGrid;