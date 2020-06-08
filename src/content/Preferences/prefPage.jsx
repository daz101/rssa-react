import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import MovieGrid  from "./MovieGrid.jsx";
import { Link } from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

class PrefPage extends Component {
    
    render() { 
        return ( 
       <div>

<ProgressBar
percent={50}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"> 

<Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginLeft:40, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="30"
              src="/one.png"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="30"
              src="/two.png"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ paddingright:90, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="30"
              src="/three.png"
            />
          )}
        </Step>

        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="/four.png"
            />
          )}
        </Step>

        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginRight:40, filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="/five.png"
            />
          )}
        </Step>

  </ProgressBar>


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

<Link to="/movies">
<Button variant="primary" style={{float: 'right', marginRight: 60}}>Next</Button>
</Link>

</div>
     
        );
    }
}
 
export default PrefPage;