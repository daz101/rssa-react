import { Component } from "react";
import { Button, Col, ProgressBar, Row } from "react-bootstrap";

class EmotionStats extends Component {

	render() {
		const movie = this.props.movie;
		const emotions = [
			{ emo: 'Joy', max: 0.318181818181818, min: 0.0382546323968918 },
			{ emo: 'Trust', max: 0.253994490358127, min: 0.0817610062893082 },
			{ emo: 'Fear', max: 0.209126984126984, min: 0.0273270708795901 },
			{ emo: 'Surprise', max: 0.166202984427503, min: 0.0256678889470927 },
			{ emo: 'Sadness', max: 0.188492063492063, min: 0.025706940874036 },
			{ emo: 'Disgust', max: 0.157538659793814, min: 0.00886524822695036 },
			{ emo: 'Anger', max: 0.182929272690844, min: 0.0161596958174905 },
			{ emo: 'Anticipation', max: 0.251623376623377, min: 0.0645546921697549 }
		];



		return (
			<div>
				<h4>Emotions</h4>
				<div className="emoStatbars">
					{
						emotions.map((emotion, i) =>
							<Row key={emotion.emo + '_' + i + '_' + movie.id} md={2} style={{ margin: "1px 0", height: "27px" }}>
								<Col className="d-flex" md={{ span: 3, offset: 3 }} style={{ padding: "0" }} >
									<p style={{ margin: "auto 0", textAlign: "left" }}>{emotion.emo.toLowerCase()}</p>
								</Col>
								<Col md={{ span: 3, offset: 0 }} style={{margin: "auto 0"}}>
									<ProgressBar now={movie[emotion.emo.toLowerCase()] / emotion.max * 100} />
								</Col>
							</Row>
						)
					} 
				</div>
			</div>
		)
	}
}

export default EmotionStats;