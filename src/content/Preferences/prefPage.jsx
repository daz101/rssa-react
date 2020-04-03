import React, { Component } from 'react';
import { Link } from "react-router-dom";

class PrefPage extends Component {
    
    render() { 
        return ( 
       <div>
	<div className="movie_ribbon">
		<div id="carouselMovies" className="carousel slide mainContainer prefHolder" >
        <div class="container">
						<div class="wrapper-block">
				
							<div className="img-block">
						
					   			<img id="TN_1" src="/m_1.jpg" class="imageTrans" style={{width:"100px", height:"120px"}}/>
					   
					   			<div class="middle">
					  	 			<fieldset class="rating">
										<input class="prefStar" type="radio" id="star5_2" name="rating_2" value="5" /><label for="star5_2"></label>
										<input class="prefStar" type="radio" id="star4_2" name="rating_2" value="4" /><label for="star4_2"></label>
										<input class="prefStar" type="radio" id="star3_2" name="rating_2" value="3" /><label for="star3_2"></label>
										<input class="prefStar" type="radio" id="star2_2" name="rating_2" value="2" /><label for="star2_2"></label>
										<input class="prefStar" type="radio" id="star1_2" name="rating_2" value="1" /><label for="star1_2"></label>
									</fieldset>
									<div class="text"> Movie Name</div>
					 
								</div>
							</div>
					
						</div>
					</div>

                    <a class="carousel-control-next" href="#carouselMovies" role="button" data-slide="next">
    			<span class="carousel-control-next-icon" aria-hidden="true"></span>
    			<span class="sr-only">Next</span>
  			</a>
        </div>
        </div>
       </div> 
        );
    }
}
 
export default PrefPage;