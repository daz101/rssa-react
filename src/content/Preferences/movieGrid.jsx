import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class MovieGrid extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
		  rating: 0 
		}
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
						<div class="wrapper-block">
				
							<div class="img-block">
						
					   			<img id="TN_1" src="/m_1.jpg" class="imageTrans"/>
					   
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
									<div class="text"> Movie Name</div>
								</div>
							</div>										
						</div>
					</div>
				
				</div>
            </div>
         );
    }
}
 
export default MovieGrid;