import React, { Component } from "react";
// import { Link } from "react-router-dom";
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

export default class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.onChangeMovieId = this.onChangeMovieId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      movies: [],
      mId: ""
    };
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

  // deleteMovie(id) {
  //   axios.delete("http://localhost:5000/movies/" + id).then(response => {
  //     console.log(response.data);
  //   });

  //   this.setState({
  //     movies: this.state.movies.filter(el => el._id !== id)
  //   });
  // }

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

  render() {
    return (
      <div>
        <h3>
          Movie DataBase
          <input
            type="text"
            className="float-sm-right"
            rows="1"
            value={this.state.mId}
            onChange={this.onChangeMovieId}
          />
        </h3>
        <div className="float-sm-right">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="submit"
                value="Search by ID"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>rssa_id</th>
              <th>movie_id</th>
              <th>imdb_id</th>
              <th>title</th>
              <th>year</th>
              <th>runtime</th>
              <th>genre</th>
              <th>aveRating</th>
              <th>director</th>
              <th>writer</th>
              {/* <th>description</th> */}
              <th>cast</th>
              <th>poster</th>
            </tr>
          </thead>
          <tbody>{this.movieList()}</tbody>
        </table>
      </div>
    );
  }
}
