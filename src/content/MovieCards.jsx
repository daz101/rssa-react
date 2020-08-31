import React, { Component, useState } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Link } from "react-router-dom";
import '../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import test from '../data';
import Display_Card from './card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
/*import movieInfo from' ./movieInfo';*/ 

class Moviecard extends Component {
    state = {  }

    constructor() {
      super();

      this.state = {
        rate: '',
        isHovered: false,
        isActive: false,
        rate2:'',
        isShown: '',
        setIsShown: ''
      };
      this.handleHover = this.handleHover.bind(this);
     
    }

    handleShow = ()=>{
      this.setState({
          isActive: true
      })
  };

  handleHide = () =>{
      this.setState({
          isActive: false
      })
  };

    handleHover(){
      this.setState(prevState => ({
          isHovered: !prevState.isHovered
      }));
     
  };
    
    handleRateChange = evt => {
      this.setState({ rate: evt.target.value });
    };

    handleRateChange1 = evt => {
      this.setState({ rate2: evt.target.value });
    };

    handleSubmit = evt => {

      const { rate } = this.state;
      const { rate2 } = this.state;
      alert(`Signed up with rate: ${rate}`);
    };

    canBeSubmitted() {
      const { rate } = this.state;
      const { rate2 } = this.state;
      return rate.length, rate2.length;
    }


    render() { 
      const active = this.state.isActive ? "pulse animated" : "";
      const isEnabled = this.canBeSubmitted();
      const { rate } = this.state;
      const { rate2 } = this.state;
 

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
            <div class="row padding">
            <div class="col-sm-4">
              <ul class="list-group">
              <form onSubmit={this.handleSubmit}>
                <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
                  <strong> Movies You May Like</strong>
                </li>
                <li class="list-group-item  d-flex justify-content-between align-items-center">
                  <img height="100px" src="/inception.jpg"  /> <b> Inception </b>
                  {/* <div>
                    <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                      Toggle
                    </Button>
                    <UncontrolledCollapse toggler="#toggler">
                      <Card>
                        <CardBody>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                          similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                          dignissimos esse fuga! Minus, alias.
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                  </div>*/}
                  <div class="rating" >
                    <input type="radio" id="star1_5" name="rating1" value="5" checked={this.state.rate === "5"} onChange={this.handleRateChange} /><label for="star1_5"> 5 stars</label>
                    <input type="radio" id="star1_4" name="rating1" value="4" checked={this.state.rate === "4"} onChange={this.handleRateChange} /><label for="star1_4"> 4 stars</label>
                    <input type="radio" id="star1_3" name="rating1" value="3" checked={this.state.rate === "3"} onChange={this.handleRateChange} /><label for="star1_3"> 3 stars</label>
                    <input type="radio" id="star1_2" name="rating1" value="2" checked={this.state.rate === "2"} onChange={this.handleRateChange} /><label for="star1_2"> 2 stars</label>
                    <input type="radio" id="star1_1" name="rating1" value="1" checked={this.state.rate === "1"} onChange={this.handleRateChange} /><label for="star1_1"> 1 star</label>
                  </div>
                </li>


                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/dark_knight.jpg" /> <b> The Dark Knight </b>
                  <div class="rating">
                    <input type="radio" id="star2_5" name="rating2" value="5" checked={this.state.rate2 === "5"} onChange={this.handleRateChange1} /><label for="star2_5" > 5 stars</label>
                    <input type="radio" id="star2_4" name="rating2" value="4" checked={this.state.rate2 === "4"} onChange={this.handleRateChange1} /><label for="star2_4"> 4 stars</label>
                    <input type="radio" id="star2_3" name="rating2" value="3" checked={this.state.rate2 === "3"} onChange={this.handleRateChange1} /><label for="star2_3"> 3 stars</label>
                    <input type="radio" id="star2_2" name="rating2" value="2" checked={this.state.rate2 === "2"} onChange={this.handleRateChange1} /><label for="star2_2"> 2 stars</label>
                    <input type="radio" id="star2_1" name="rating2" value="1" checked={this.state.rate2 === "1"} onChange={this.handleRateChange} /><label for="star2_1"> 1 star</label>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/godfather.jpg" /> <b> Godfather </b>
                  <div class="rating">
                    <input type="radio" id="star3_5" name="rating3" value="5" /><label for="star3_5" required> 5 stars</label>
                    <input type="radio" id="star3_4" name="rating3" value="4" /><label for="star3_4"> 4 stars</label>
                    <input type="radio" id="star3_3" name="rating3" value="3" /><label for="star3_3"> 3 stars</label>
                    <input type="radio" id="star3_2" name="rating3" value="2" /><label for="star3_2"> 2 stars</label>
                    <input type="radio" id="star3_1" name="rating3" value="1" /><label for="star3_1"> 1 star</label>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/pulp_fiction.jpg" /> <b> Pulp fiction </b>
                  <div class="rating">
                    <input type="radio" id="star4_5" name="rating4" value="5" /><label for="star4_5" required> 5 stars</label>
                    <input type="radio" id="star4_4" name="rating4" value="4" /><label for="star4_4"> 4 stars</label>
                    <input type="radio" id="star4_3" name="rating4" value="3" /><label for="star4_3"> 3 stars</label>
                    <input type="radio" id="star4_2" name="rating4" value="2" /><label for="star4_2"> 2 stars</label>
                    <input type="radio" id="star4_1" name="rating4" value="1" /><label for="star4_1"> 1 star</label>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/star_wars.jpg" /> <b> Star Wars </b>
                  <div class="rating">
                    <input type="radio" id="star5_5" name="rating5" value="5" /><label for="star5_5" required> 5 stars</label>
                    <input type="radio" id="star5_4" name="rating5" value="4" /><label for="star5_4"> 4 stars</label>
                    <input type="radio" id="star5_3" name="rating5" value="3" /><label for="star5_3"> 3 stars</label>
                    <input type="radio" id="star5_2" name="rating5" value="2" /><label for="star5_2"> 2 stars</label>
                    <input type="radio" id="star5_1" name="rating5" value="1" /><label for="star5_1"> 1 star</label>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/goodfellas.jpg" /> <b> Good Fellas </b>
                  <div class="rating">
                    <input type="radio" id="star6_5" name="rating6" value="5" /><label for="star6_5" required> 5 stars</label>
                    <input type="radio" id="star6_4" name="rating6" value="4" /><label for="star6_4"> 4 stars</label>
                    <input type="radio" id="star6_3" name="rating6" value="3" /><label for="star6_3"> 3 stars</label>
                    <input type="radio" id="star6_2" name="rating6" value="2" /><label for="star6_2"> 2 stars</label>
                    <input type="radio" id="star6_1" name="rating6" value="1" /><label for="star6_1"> 1 star</label>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/toy_story.jpg" /> <b> Toy Story </b>
                  <div class="rating">
                    <input type="radio" id="star7_5" name="rating7" value="1" /><label for="star7_5" required> 5 stars</label>
                    <input type="radio" id="star7_4" name="rating7" value="2" /><label for="star7_4"> 4 stars</label>
                    <input type="radio" id="star7_3" name="rating7" value="3" /><label for="star7_3"> 3 stars</label>
                    <input type="radio" id="star7_2" name="rating7" value="2" /><label for="star7_2"> 2 stars</label>
                    <input type="radio" id="star7_1" name="rating7" value="1" /><label for="star7_1"> 1 star</label>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/titanic.jpg" /> <b> Titanic </b>
                  <div class="rating">
                    <input type="radio" id="star8_5" name="rating8" value="5" /><label for="star8_5" required>5 stars</label>
                    <input type="radio" id="star8_4" name="rating8" value="4" /><label for="star8_4">4 stars</label>
                    <input type="radio" id="star8_3" name="rating8" value="3" /><label for="star8_3">3 stars</label>
                    <input type="radio" id="star8_2" name="rating8" value="2" /><label for="star8_2">2 stars</label>
                    <input type="radio" id="star8_1" name="rating8" value="1" /><label for="star8_1">1 star</label>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/avengers_endgame.jpg" /> <b> Avengers: Endgame </b>
                  <div class="rating">
                    <input type="radio" id="star9_5" name="rating9" value="5" /><label for="star9_5" >5 stars</label>
                    <input type="radio" id="star9_4" name="rating9" value="4" /><label for="star9_4">4 stars</label>
                    <input type="radio" id="star9_3" name="rating9" value="3" /><label for="star9_3">3 stars</label>
                    <input type="radio" id="star9_2" name="rating9" value="2" /><label for="star9_2">2 stars</label>
                    <input type="radio" id="star9_1" name="rating9" value="1" /><label for="star9_1">1 star</label>
                    </div>
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img height="100px" src="/images/lotr.jpg" /> <b> Lord Of The Rings</b>
                  <div class="rating">
                    <input type="radio" id="star10_5" name="rating10" value="5" /><label for="star10_5">5 stars</label>
                    <input type="radio" id="star10_4" name="rating10" value="4" /><label for="star10_4">4 stars</label>
                    <input type="radio" id="star10_3" name="rating10" value="3" /><label for="star10_3">3 stars</label>
                    <input type="radio" id="star10_2" name="rating10" value="2" /><label for="star10_2">2 stars</label>
                    <input type="radio" id="star10_1" name="rating10" value="1" /><label for="star10_1">1 star</label>
                    </div>
                </li>
              </form>
              </ul>
            </div>

            <div class="col-sm-3">
              <Display_Card  className={active} onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}>
              </Display_Card>
            </div>

            <div class="col-sm-4">
            <ul class="list-group">
            <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
             <strong> Movies You May Hate</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/alien.jpg" /> <b> Alien </b>
              <div class="rating">
                <input type="radio" id="star11_5" name="rating11" value="5" /><label for="star11_5">5 stars</label>
                <input type="radio" id="star11_4" name="rating11" value="4" /><label for="star11_4">4 stars</label>
                <input type="radio" id="star11_3" name="rating11" value="3" /><label for="star11_3">3 stars</label>
                <input type="radio" id="star11_2" name="rating11" value="2" /><label for="star11_2">2 stars</label>
                <input type="radio" id="star11_1" name="rating11" value="1" /><label for="star11_1">1 star</label>
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/extraction.jpg" /> <b> Extractions</b>
              <div class="rating">
                <input type="radio" id="star12_5" name="rating12" value="5" /><label for="star12_5">5 stars</label>
                <input type="radio" id="star12_4" name="rating12" value="4" /><label for="star12_4">4 stars</label>
                <input type="radio" id="star12_3" name="rating12" value="3" /><label for="star12_2">3 stars</label>
                <input type="radio" id="star12_2" name="rating12" value="2" /><label for="star12_2">2 stars</label>
                <input type="radio" id="star12_1" name="rating12" value="1" /><label for="star12_1">1 star</label>
                </div>
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/lotr.jpg" /> <b> Fantasy Island </b>
              <div class="rating">
                <input type="radio" id="star13_5" name="rating13" value="5" /><label for="star13_5">5 stars</label>
                <input type="radio" id="star13_4" name="rating13" value="4" /><label for="star13_4">4 stars</label>
                <input type="radio" id="star13_3" name="rating13" value="3" /><label for="star13_3">3 stars</label>
                <input type="radio" id="star13_2" name="rating13" value="2" /><label for="star13_2">2 stars</label>
                <input type="radio" id="star13_1" name="rating13" value="1" /><label for="star13_1">1 star</label>
                </div>
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/6_underground.jpg" /> <b> 6 Underground </b>
              <div class="rating">
                <input type="radio" id="star14_5" name="rating14" value="5" /><label for="star14_5">5 stars</label>
                <input type="radio" id="star14_4" name="rating14" value="4" /><label for="star14_4">4 stars</label>
                <input type="radio" id="star14_3" name="rating14" value="3" /><label for="star14_3">3 stars</label>
                <input type="radio" id="star14_2" name="rating14" value="2" /><label for="star14_2">2 stars</label>
                <input type="radio" id="star14_1" name="rating14" value="1" /><label for="star14_1">1 star</label>
                </div>
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/deadpool_2.jpg" /> <b> Deadpool 2</b>
              <div class="rating">
                <input type="radio" id="star15_5" name="rating15" value="5" /><label for="star15_5">5 stars</label>
                <input type="radio" id="star15_4" name="rating15" value="4" /><label for="star15_4">4 stars</label>
                <input type="radio" id="star15_3" name="rating15" value="3" /><label for="star15_3">3 stars</label>
                <input type="radio" id="star15_2" name="rating15" value="2" /><label for="star15_2">2 stars</label>
                <input type="radio" id="star15_1" name="rating15" value="1" /><label for="star15_1">1 star</label>
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/black_panther.jpg" /> <b> Black Panther </b>
              <div class="rating">
                <input type="radio" id="star16_5" name="rating16" value="10" /><label for="star16_5">5 stars</label>
                <input type="radio" id="star16_4" name="rating16" value="9" /><label for="star16_4">4 stars</label>
                <input type="radio" id="star16_3" name="rating16" value="8" /><label for="star16_3">3 stars</label>
                <input type="radio" id="star16_2" name="rating16" value="7" /><label for="star16_2">2 stars</label>
                <input type="radio" id="star16_1" name="rating16" value="6" /><label for="star16_1">1 star</label>
                </div>
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/birdbox.jpg" /> <b> Bird Box</b>
              <div class="rating">
                <input type="radio" id="star17_5" name="rating17" value="10" /><label for="star17_5">5 stars</label>
                <input type="radio" id="star17_4" name="rating17" value="9" /><label for="star17_4">4 stars</label>
                <input type="radio" id="star17_3" name="rating17" value="8" /><label for="star17_2">3 stars</label>
                <input type="radio" id="star17_2" name="rating17" value="7" /><label for="star17_2">2 stars</label>
                <input type="radio" id="star17_1" name="rating17" value="6" /><label for="star17_1">1 star</label>
                </div>
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/ff8.jpg" /> <b> The Fast & Fursious</b>
              <div class="rating">
                <input type="radio" id="star18_5" name="rating18" value="10" /><label for="star18_5">5 stars</label>
                <input type="radio" id="star18_4" name="rating18" value="9" /><label for="star18_4">4 stars</label>
                <input type="radio" id="star18_3" name="rating18" value="8" /><label for="star18_3">3 stars</label>
                <input type="radio" id="star18_2" name="rating18" value="7" /><label for="star18_2">2 stars</label>
                <input type="radio" id="star18_1" name="rating18" value="6" /><label for="star18_1">1 star</label>
                </div>
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/train_to_busan.jpg" /> <b> Train to Busan </b>
              <div class="rating">
                <input type="radio" id="star19_5" name="rating19" value="5" /><label for="star19_5">5 stars</label>
                <input type="radio" id="star19_4" name="rating19" value="4" /><label for="star19_4">4 stars</label>
                <input type="radio" id="star19_3" name="rating19" value="3" /><label for="star19_3">3 stars</label>
                <input type="radio" id="star19_2" name="rating19" value="2" /><label for="star19_2">2 stars</label>
                <input type="radio" id="star19_1" name="rating19" value="1" /><label for="star19_1">1 star</label>
                </div>
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img height="100px" src="/images/jurassic_world.jpg" /> <b> Jurassic World </b>
              <div class="rating">
                <input type="radio" id="star20_5" name="rating20" value="5" /><label for="star20_5">5 stars</label>
                <input type="radio" id="star20_4" name="rating20" value="4" /><label for="star20_4">4 stars</label>
                <input type="radio" id="star20_3" name="rating20" value="3" /><label for="star20_3">3 stars</label>
                <input type="radio" id="star20_2" name="rating20" value="2" /><label for="star20_2">2 stars</label>
                <input type="radio" id="star20_1" name="rating20" value="1" /><label for="star20_1">1 star</label>
                </div>
            </li>
            </ul>
          </div>
        </div>
        
        
        <div align ="right" class="padding">
          <Link to="/survey">
          <button id="register" type="button" class="btn btn-sm btn-primary"  aligned onclick="window.location.href='/'">Next</button>
      
        <button disabled={!isEnabled}>Submit</button>
        </Link>
      </div>


      </div>
        );
    }
}
 
export default Moviecard;