import { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

class GridRow extends Component {

	render() {
		return (
			<>
				<Card bg="light" style={{ padding: "0" }}>
					{this.props.headerLabel ?
						<Card.Header>
							<h4>{this.props.headerLabel}</h4>
						</Card.Header>
						: <></>}
					<Card.Body>
						<Row>
							<Col className="cellblock" >
								{
									this.props.data1.slice(0, this.props.limit).map(movie => (
										<img src={movie.poster} alt={movie.title} key={movie.item_id}
											width={54} height={54}
											style={{ margin: "0.3em", cursor: "pointer" }}
											onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/default_movie_icon.svg"; }}
											onClick={evt => this.props.onClickHandler(true, movie)} />
									))
								}
							</Col>
							<Col className="cellblock" >
								{
									this.props.data2.slice(0, this.props.limit).map(movie => (
										<img src={movie.poster} alt={movie.title} key={movie.item_id}
											width={54} height={54}
											style={{ margin: "0.3em", cursor: "pointer" }}
											onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/default_movie_icon.svg"; }}
											onClick={evt => this.props.onClickHandler(true, movie)} />
									))
								}
							</Col>
						</Row>
						{this.props.data1Label && this.props.data2Label ?
							<Row>
								<Col className="cellLabelBottom" >
									<h4>{this.props.data1Label}</h4>
								</Col>
								<Col className="cellLabelBottom" >
									<h4>{this.props.data2Label}</h4>
								</Col>
							</Row>
							: <></>}
					</Card.Body>
				</Card>
			</>
		)
	}
}

export default GridRow;