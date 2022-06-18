import React, { Component } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';

class EmotionToggle extends Component {


	render() {
		const emotions = ['Joy', 'Trust', 'Fear', 'Surprise', 'Sadness', 'Disgust', 'Anger', 'Anticipation'];
		return (
			<>
				<Container>
					<h4>Your taste on movie emotions</h4>
					<div>
						{
							emotions.map((emotion, i) =>
								<Row key={emotion + '_' + i} md={2} style={{ margin: "9px 0" }}>
									<Col className="d-flex" md={{ span: 2, offset: 1 }} style={{ height: "36px" }}>
										<p style={{ margin: "auto" }}>{emotion}</p>
									</Col>
									<Col md={{ span: 3, offset: 2 }}>
										<ButtonGroup>
											<Button variant="ersToggle">Low</Button>
											<Button variant="ersToggle">High</Button>
											<Button variant="ersToggle">Ignore</Button>
										</ButtonGroup>
									</Col>
								</Row>
							)
						}
					</div>
					<div className='d-flex'>
						<Button variant="ersControl" style={{margin: "2em auto 0"}}>
							Reset
						</Button>
					</div>
				</Container>
			</>
		)
	}
}

export default EmotionToggle;