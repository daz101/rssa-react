import React, { Component } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
/*import movieInfo from' ./movieInfo';*/ 

class Moviecard extends Component {
    state = {  }
    render() { 
        return ( 
        <div>

<ProgressBar
percent={75}
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
              style={{ filter: `grayscale(${accomplished ? 0 : 100}%)` }}
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
            <div class="row">
  <div class="col-sm-3">
  <ul class="list-group">
  <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
    <strong> Movies You May Like</strong>
    
  </li>
  <li class="list-group-item  d-flex justify-content-between align-items-center">
    Dapibus ac facilisis in
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>
</ul>
  </div>

  <div class="col-sm-4">
      </div>

  <div class="col-sm-3">
  <ul class="list-group">
  <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
   <strong> Movies You May Hate</strong>
    
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Dapibus ac facilisis in
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li> 

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li> 

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li> 
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <div class="rating">
      <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Rocks!">5 stars</label>
      <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Rocks!">4 stars</label>
      <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Pretty good">3 stars</label>
      <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Pretty good">2 stars</label>
      <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh">1 star</label>
      </div>
  </li>

  
</ul>
  </div>
</div>

<div className="float-right">
<button type="button" class="btn btn-primary">Next</button></div>
        </div> );
    }
}
 
export default Moviecard;