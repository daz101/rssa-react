import React from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
import '../App.css';

const Example = (props) => {
  return (
    <div>
      <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333', width:"100%", height:"100%", marginLeft: "-30px" }}>
        <CardImg top src="/inception.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Inception</CardTitle>
          <CardText>Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Example;