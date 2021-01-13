import React, { Component } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Link } from "react-router-dom";
import '../App.css';
import test from '../data';
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
import Display_Card from './card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'react-star-rating/dist/css/react-star-rating.min.css'; 
import ReactStars from "react-rating-stars-component";



const Movie = props => (
  <tr>
    <td>{props.movie.rssa_id}</td>
    <td>{props.movie.movie_id}</td>
    <td>{props.movie.imdb_id}</td>
    <td>{props.movie.title}</td>
    <td>{props.movie.year}</td>
    <td>{props.movie.runtime}</td>
    <td>{props.movie.genre}</td>
    <td>{props.movie.aveRating}</td>
    <td>{props.movie.director}</td>
    <td>{props.movie.writer}</td>
    {/* <td>{props.movie.description}</td> */}
    <td>{props.movie.cast}</td>
    <td>
      <img src={props.movie.poster} alt={props.movie.title} width="100" />
    </td>
  </tr>
);

class Moviecard extends Component {
    

    constructor(props) {
      super(props);
  
      this.onChangeMovieId = this.onChangeMovieId.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        movies: [],
        mId: "",
        rate: '',
        isHovered: false,
        isActive: false,
        rate2:'',
        isShown: '',
        setIsShown: false
      };
      this.handleHover = this.handleHover.bind(this);
    }
  
    componentDidMount() {
      var API = "";
      if (process.env.NODE_ENV === "production") {
        API = "https://movie-mern.herokuapp.com/api/movies/";
      } else {
        API = "http://localhost:5000/api/movies/";
      }
      axios
        .get(API)
        .then(response => {
          this.setState({ movies: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }


    

    movieList() {
      return this.state.movies.map(currentmovie => {
        return (
          <Movie
            movie={currentmovie}
            // deleteMovie={this.deleteMovie}
            key={currentmovie._id}
          />
        );
      });
    }
  
    onChangeMovieId(e) {
      this.setState({
        mId: e.target.value
      });
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      // const exercise = {
      //   username: this.state.username,
      //   description: this.state.description,
      //   duration: this.state.duration,
      //   date: this.state.date
      // };
  
      console.log(this.state.mId);
      var API = "";
      if (process.env.NODE_ENV === "production") {
        API = "https://movie-mern.herokuapp.com/api/movies/";
      } else {
        API = "http://localhost:5000/api/movies/";
      }
      axios
        .get(API + this.state.mId)
        .then(response => {
          this.setState({ movies: response.data });
        })
        .catch(error => {
          console.log(error);
        });
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
      const ratingChanged = (newRating) => {
        console.log(newRating);
      };
      
     

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
              {/*<ul>
        { this.state.movies.map(movies => <li>{movies.title}</li>)}
              </ul> */}
              <form onSubmit={this.handleSubmit}>

              { this.state.setIsShown ? (
              
              <div class="col-sm-3">
             
                
                <Card body className={active} inverse style={{ backgroundColor: '#333', borderColor: '#333', width:"100%", height:"100%", marginLeft: "-30px" }}>
        <CardImg top src={movie.poster} alt="Card image cap" />
        <CardBody>
          <CardTitle>{movie.title}</CardTitle>
          <CardText>{movie.description}</CardText>
        </CardBody>
      </Card>
              
              </div>
              ): (
                <div class="col-sm-3"></div>
              )
            
            }
              
            <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
                  <strong> Movies You May Like</strong>
                </li>
            <ul className="list-group">
          {this.state.movies.slice(0, 10).map((movie) => (
            <li key={movie.movie_id} className="list-group-item d-flex justify-content-between align-items-center" onMouseEnter={() => this.setState({ setIsShown: true })} onMouseLeave={() => this.setState({ setIsShown: false })}>
              
              <img height="100px" src={movie.poster} /> <b> {movie.title} </b>
                  <div class="rating">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700" />
                     </div>
            </li>
          ))}
        </ul>
        
              </form>
              </ul>
            </div>

           

            <div class="col-sm-4">
            <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
                  <strong> Movies You May Hate</strong>
                </li>
            <ul className="list-group">
          {this.state.movies.slice(20, 30).map((movie) => (
            <li key={movie.movie_id} className="list-group-item d-flex justify-content-between align-items-center" >
              
              <img height="100px" src={movie.poster} /> <b> {movie.title} </b>
                  <div class="rating">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700" />
                    </div>
           
                   
            </li>
          ))}
        </ul>
        </div>
        </div>
        
        
        <div align ="right" class="padding">
          <Link to="/survey">
          <button id="register" type="button" class="btn btn-sm btn-primary"  aligned onclick="window.location.href='/'">Next</button>
      
        {/*<button disabled={!isEnabled}>Submit</button>*/} 
        </Link>
      </div>


      </div>
        );
    }
   
}
 
export default Moviecard;