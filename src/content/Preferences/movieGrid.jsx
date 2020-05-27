import React, { Component } from 'react';

class MovieGrid extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div class="movie-block" id="movie_10">
					<div class="container">
						<div class="wrapper-block">
				
							<div class="img-block">
						
					   			<img id="TN_1" src="/m_1.jpg" class="imageTrans"/>
					   
					   			<div class="middle">
					   				<fieldset class="rating">
										<input class="prefStar" type="radio" id="star5_10" name="rating_10" value="5" /><label for="star5_10">5 stars</label>
										<input class="prefStar" type="radio" id="star4_10" name="rating_10" value="4" /><label for="star4_10">4 stars</label>
										<input class="prefStar" type="radio" id="star3_10" name="rating_10" value="3" /><label for="star3_10">3 stars</label>
										<input class="prefStar" type="radio" id="star2_10" name="rating_10" value="2" /><label for="star2_10">2 stars</label>
										<input class="prefStar" type="radio" id="star1_10" name="rating_10" value="1" /><label for="star1_10">1 star</label>
									</fieldset>
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