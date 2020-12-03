 
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import MovieGrid  from "./movieGrid.jsx";
import { Link } from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Steps from "intro.js-react";
import "intro.js/introjs.css";

class PrefPage extends Component {
  constructor(props) {
    super(); 

    this.state = {
      count: 0,
      clicked: false, 
      stepsEnabled: true,
      initialStep: 0,
      steps: [
        {
          element: ".carousel slide",
          intro: "Hello step"
        },
        {
          element: ".rankHolder",
          intro: "World step"
        }
      ]
    };

     const width ={ 
width: '50%'
  };
  }

 

  getCount() {
    const clicked = this.state.clicked
    if(clicked){
      this.setState({count: this.state.count + 1, clicked: true})
    } 

  }
    
    render() { 
      const {
        stepsEnabled,
        steps,
        initialStep
      } = this.state;

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
       <br></br>
       <br></br>
       <br></br>

       <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={this.onExit}
        />
       


	<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
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
			<div class="rankHolder" >
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