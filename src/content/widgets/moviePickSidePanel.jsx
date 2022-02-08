import React, { Component } from "react";

class MoviePickSidePanel extends Component {

	onValueChange = (event) => {
		let movieid = event.target.value;
		this.props.selectionHandler(movieid);
		// this.setState({selected: movieid});
	}

	onHover = (event, movie) => {
		console.log(event.target);
		// console.log(movie);
		this.props.hoverHandler(true, movie);
	}

	render() {

		let selected = this.props.selectedid;
		console.log(selected);
		const selectClassStr = 'list-group-item-selected';
		const listClassStr = 'list-group-item';

		return (
			<div className="col-sm-4">
				<div style={{ minHeight: "102px", maxHeight: "102px", textAlign: "center", 
					padding: "1.8em", fontSize: "1.2em", borderRadius: "3px", backgroundColor: "#e9ecef"
				}}>
					<strong>{this.props.panelTitle}</strong>
				</div>
					<ol className="list-group">
						{this.props.movieList.map((movie) => (
							console.log(selected + "<--->" + movie.movie_id),
							<label htmlFor={'ID_'+movie.movie_id}>
							<li key={movie.movie_id}
								className={(selected === movie.movie_id ? selectClassStr : listClassStr) + " d-flex justify-content-between align-items-center"}
								onMouseEnter={((event) => this.onHover(event, movie))}
							// onMouseLeave={() => this.props.handler(false, null)}
								sytle={{backgroundColor: selected === movie.movie_id ? "red" : ""}}
							>
								<b> {movie.title} </b>
								<div>
									<input type="radio" name="movie-select" id={'ID_'+movie.movie_id} 
									onChange={this.onValueChange} value={movie.movie_id} />
								</div>
							</li>
							</label>
						))}
					</ol>
			</div>
		);
	}
}

export default MoviePickSidePanel;