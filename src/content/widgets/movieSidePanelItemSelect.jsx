import React, { Component } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

class SidePanelItemSelect extends Component {

	render() {
		const movie = this.props.movie;
		let itemClassStr = '';
		let btnVariant = '';
		let btnText = '';

		if (this.props.selectedid === movie.movie_id) {
			itemClassStr = 'list-group-item-selected';
			btnVariant = 'success';
			btnText = 'Selected';
		} else {
			itemClassStr = 'list-group-item';
			btnVariant = 'secondary';
			btnText = 'Choose';
		}

		return <>
			<ListGroup.Item as="div"
				className={itemClassStr + " d-flex justify-content-between align-items-center"}
				onMouseEnter={(evt) => this.props.hoverHandler(evt, true, movie, "enter")}
			>
				<div style={{
					position: "relative", boxSizing: "border-box", width: "63%",
					display: "inline-block", verticalAlign: "middle"
				}}>
					<p style={{ marginBottom: "0", marginTop: "0.25rem" }}>
						{movie.title + " (" + movie.year + ")"}
					</p>
				</div>

				<div>
					<Button variant={btnVariant} size="md" style={{ float: 'right' }}
						onClick={this.props.selectStateHandler} value={movie.movie_id} >
						{btnText}
					</Button>
				</div>
			</ListGroup.Item>
		</>;
	}
}

export default SidePanelItemSelect;