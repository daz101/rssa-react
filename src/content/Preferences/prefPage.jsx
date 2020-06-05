import React, { Component, useState } from 'react';
import MovieGrid  from "./MovieGrid.jsx";

class PrefPage extends Component {
    
    render() { 
        return ( 
       <div>
		   <br></br>
		   <br></br> 
	<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
  <div class="container">
  <div class="row">
    <div class="col-sm">
      <MovieGrid/>
    </div>
    <div class="col-sm">
    <MovieGrid/>
    </div>
    <div class="col-sm">
    <MovieGrid/>
    </div>
    <div class="col-sm">
      <MovieGrid/>
    </div>
    <div class="col-sm">
      <MovieGrid/>
    </div>
  </div>
</div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
 
</div>
       </div> 
        );
    }
}
 
export default PrefPage;