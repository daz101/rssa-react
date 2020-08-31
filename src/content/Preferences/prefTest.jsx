import React, { Component } from 'react';
import MovieGrid  from "./MovieGrid.jsx";
import Carousel from 'react-bootstrap/Carousel'; 
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PrefTest extends Component {
    
    constructor(props, context) {
		super(props, context);

		this.handleSelect = this.handleSelect.bind(this);

		this.state = {
			index: 0,
			direction: null,
		};
	}
        
    handleSelect(selectedIndex, e) {
		this.setState({
			index: selectedIndex,
			direction: e,
		});
  }    
  


    render() { 

        const { index, direction } = this.state;
 
  

        return ( 
       <div>
		   <br></br>
		   <br></br> 
           
           <Carousel activeIndex={index}
				direction={direction}
				onSelect={this.handleSelect}>
      
      <Container>
  <Row>
    <Col>
    <Carousel.Item>
    <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />
      </Carousel.Item>
    </Col>


    <Col>
    <Carousel.Item>
      
      </Carousel.Item>
    </Col>

    <Col>
    <Carousel.Item>
     
      </Carousel.Item>
    </Col>

    <Col>
    <Carousel.Item>
      
      </Carousel.Item>
    </Col>

    <Col>
    <Carousel.Item>
      
      </Carousel.Item>
    </Col>
  </Row>
</Container>
      
    
    </Carousel>



       </div> 
        );
    }
}
 
export default PrefTest;