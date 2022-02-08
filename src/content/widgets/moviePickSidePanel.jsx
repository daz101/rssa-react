import React, { Component } from "react";

class MoviePickSidePanel extends Component {

	onValueChange = (event) => {
		let movieid = event.target.value;
		this.props.selectionHandler(movieid);
	}

	onHover = (event, movie) => {
		this.props.hoverHandler(true, movie);
	}

	render() {

		let selected = this.props.selectedid;
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
							<label htmlFor={'ID_'+movie.movie_id}>
							<li key={movie.movie_id}
								className={(selected === movie.movie_id ? selectClassStr : listClassStr) + " d-flex justify-content-between align-items-center"}
								onMouseEnter={((event) => this.onHover(event, movie))}
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