import React, { Component } from 'react';
import Carousel from "react-multi-carousel";
import MovieGrid  from "./Preferences/movieGrid.jsx";
import WithStyles from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

class CarouselClass extends Component {

  render() {
    return (
      <Carousel  
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}		
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable>
      {/* <div><MovieGrid /></div> */}
      {/* <div>Item 2</div> */}
    	{/* <MovieGrid /> */}
		<div>
			<img src="https://m.media-amazon.com/images/M/MV5BNTdhYjEzYTEtYTkwZC00NzgxLWI0ZWEtYmEyMGZhOWYwMjE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@..jpg" class="imageTrans" />
		</div>
		<div>
			<img src="https://m.media-amazon.com/images/M/MV5BNTdhYjEzYTEtYTkwZC00NzgxLWI0ZWEtYmEyMGZhOWYwMjE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@..jpg" class="imageTrans" />
		</div>
		<div>
			<img src="https://m.media-amazon.com/images/M/MV5BNTdhYjEzYTEtYTkwZC00NzgxLWI0ZWEtYmEyMGZhOWYwMjE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@..jpg" class="imageTrans" />
		</div>
		<div>
			<img src="https://m.media-amazon.com/images/M/MV5BNTdhYjEzYTEtYTkwZC00NzgxLWI0ZWEtYmEyMGZhOWYwMjE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@..jpg" class="imageTrans" />
		</div>
		<div>
			<img src="https://m.media-amazon.com/images/M/MV5BNTdhYjEzYTEtYTkwZC00NzgxLWI0ZWEtYmEyMGZhOWYwMjE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@..jpg" class="imageTrans" />
		</div>
      </Carousel>
    );
  }
}
 
export default CarouselClass;