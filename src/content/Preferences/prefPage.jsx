import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import MovieGrid  from "./MovieGrid.jsx";
import { Link } from "react-router-dom";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Steps from "intro.js-react";
import "intro.js/introjs.css";

class PrefPage extends Component {
  constructor(props) {
    super(props);

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
     

        return ( 
       <div>



</div>
     
        );
    }

   onExit = () => {
      this.setState(() => ({ stepsEnabled: false }));
    };
}
 
export default PrefPage;