import React from "react";

export const API = process.env.NODE_ENV === "production" ? "https://movie-mern.herokuapp.com/api/movies/"
	: "http://localhost:5000/api/movies/";


export const Movie = props => (
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