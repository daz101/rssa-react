import React, { Component, useState } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import 'intro.js/introjs.css';
import { Steps, Hints } from "intro.js-react";
import MovieGrid  from "./Preferences/MovieGrid";


class PrefPage extends Component {
    

    constructor(props) {
      super(props);
  
    
  
      this.state = {
        stepsEnabled: true,
        initialStep: 0,
        steps: [
          {
            element: ".carousel-inner",
            intro: "Hello step"
          },
          {
            element: ".rankHolder",
            intro: "World step"
          }
        ],
        hintsEnabled: true,
        hints: [
          {
            element: ".container",
            hint: "Hello hint",
            hintPosition: "middle-right"
          }
        ]
      };
    }
  
    render() { 
      const {
        stepsEnabled,
        steps,
        initialStep,
        hintsEnabled,
        hints
      } = this.state;
      
        return ( 
        <div>


            <br></br>
            <br></br>

            <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={this.onExit}
        />
          	<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
  <div className="container">
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
      <div className="image"><MovieGrid /></div>
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


<div id="footer-container" >
			<div className="rankHolder" >
				<span> Ranked Movies: </span>
				<span id="NumberOfRankedMovies"> {this.state.count} </span>
				<span><i>of 15</i></span>
			</div>

<Link to="/movies">
<Button variant="primary" style={{float: 'right', marginRight: 90}}>Next</Button>
</Link>
		</div>
            
      </div>
        );
    }
    onExit = () => {
      this.setState(() => ({ stepsEnabled: false }));
    };
}
 
export default PrefPage;