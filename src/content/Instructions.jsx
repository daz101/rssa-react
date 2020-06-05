import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class Instructions extends Component {

    render() { 
        return ( 
       <div>
         <br></br>
            <br></br>

      <div className="instructions-page">   
     
        <div class="container">
  <div class="row">
    <div class="col-sm">
    <div class="card ">
  <img src="/Preference-rssa.png" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title"> Select Preferences</h5>
    <p class="card-text">Rate movies for the system to learn about your preferences. You can select "Get another option" to get a new movie option.
                  </p>
  </div>
</div>
    </div>
    <div class="col-sm">
    <div class="card">
  <img src="/recommendation-rssa.png" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Rate Recommendations</h5>
    <p class="card-text">The system will provide recommendations and for each you will be asked to rate the recommendation..</p>
  </div>
</div>
    </div>
    <div class="col-sm">
    <div class="card">
  <img src="/survey-rssa.png" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Complete Survey</h5>
    <p class="card-text">Lastly, you will be asked to complete a survey about your experience interacting with the system.</p>
  </div>
</div>
    </div>
  </div>
  
</div>
      
        </div>
     </div>
      
         );
    }
}

 
export default Instructions;
