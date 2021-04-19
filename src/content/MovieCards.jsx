import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import {Link} from "react-router-dom";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'react-star-rating/dist/css/react-star-rating.min.css';
import ReactStars from "react-rating-stars-component";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import ProgressBarComponent from "./progressBarComponent";
import {API, Movie} from "./constants";
import MovieSidePanel from "./Preferences/movieSidePanel";

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
            rate2: '',
            isShown: '',
            setIsShown: false,
            activeMovie: null,
        };
        this.handleHover = this.handleHover.bind(this);
    }
  
    componentDidMount() {
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
                <Movie movie={currentmovie}
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

    handleHover(isShown, activeMovie){
        this.setState(prevState => ({
            setIsShown: isShown,
            activeMovie: activeMovie,
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
        const {rate} = this.state;
        const {rate2} = this.state;
        return rate.length, rate2.length;
    }

    render() {
        const active = this.state.isActive ? "pulse animated" : "";
        const isEnabled = this.canBeSubmitted();
        const {rate} = this.state;
        const {rate2} = this.state;

        const ratingChanged = (newRating) => {
            console.log(newRating);
        };

        return (
            <div>
                <ProgressBarComponent percentComplete={75} />
                <br/>
                <div className="row padding">
                    <MovieSidePanel movieList={this.state.movies.slice(0, 10)} handler={this.handleHover}
                                    panelTitle={"Movies You May Like"}/>
                    {this.state.setIsShown && (this.state.activeMovie!= null) ? (
                        <div className="col-sm-4">
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333', width:"100%",
                                height:"100%"}}>
                                <CardImg top src={this.state.activeMovie.poster} alt="Card image cap"
                                         style={{maxHeight: '270px', width:'auto', height:'auto'}} />
                                <CardBody style={{maxHeight: '300px'}}>
                                    <CardTitle style={{fontWeight: 'bold', fontSize: '1.2em'}}>
                                        {this.state.activeMovie.title}
                                    </CardTitle>
                                    <CardText> Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter
                                        people's dreams and steal their secrets from their subconscious. His skill has
                                        made him a hot commodity in the world of corporate espionage but has also cost
                                        him everything he loves. Cobb gets a chance at redemption when he is offered a
                                        seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it
                                        will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    ) : (<div className="col-sm-4" />)
                    }
                    <MovieSidePanel movieList={this.state.movies.slice(10, 20)} handler={this.handleHover}
                                    panelTitle={"Movies You May Hate"}/>
                </div>
                <div align="right" className="padding">
                    <Link to="/survey">
                        <button id="register" type="button" className="btn btn-sm btn-primary"
                                onClick="window.location.href='/'">Next
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Moviecard;