import React, { Component } from 'react';

class movieInfo extends Component {
    state = {  }
    render() { 
        return ( 
            <div>

                <br></br>
                <br></br>
                <div class="col-md-4">
                <div class="card bg-light mb-3" >
  <div class="row no-gutters">
    
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Movie title <span class="badge badge-warning badge-pill">4.3 rating</span></h5>
        <p class="card-text"><small class="text-muted">Released in 2000</small></p>
        <p class="card-text"> <strong>Plot:</strong> This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"> <strong>Director:</strong> This is a wider card with supporting text below as a natural lead-in to additional content.</p>
        <p class="card-text"> <strong>Cast:</strong> This is a wider card with supporting text below as a natural lead-in to additional content.</p>
        <p class="card-text"> <strong>Genre:</strong> This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        
      </div>
    </div>
    <div class="col-md-4">
      <img src="https://source.unsplash.com/random/200x800" class="card-img" alt="..."/>
    </div>
  </div>
</div></div>
            </div>
         );
    }
}
 
export default movieInfo;