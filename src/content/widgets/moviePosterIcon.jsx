import React, { Component } from 'react';


class MoviePosterIcon extends Component {

	render() {
		let imgSrc = this.props.poster;
		let imgTitle = this.props.title;
		console.log(this.props);

		let cx = this.props.cx;
		let cy = this.props.cy;

		return (
			<>
				<img 
					cx={cx - 10} 
					cy={cy - 10}
					r ={25}
					src={imgSrc} 
					alt={imgTitle}
					width={5}
					height={5}
				/>
			</>
		);
	}
}

export default MoviePosterIcon;