import React, { Component } from 'react';
import { Image, ListGroup } from 'react-bootstrap';

class SidePanelItem extends Component {

	render() {
		const movie = this.props.movie;

		return <>
			<ListGroup.Item as="div"
				className={"d-flex justify-content-between align-items-center"}
				onMouseEnter={(evt) => this.props.hoverHandler(evt, true, movie, "enter")}
			>
				<div>
					<Image className="sidePanelThumbnail" src={movie.poster} />
				</div>
				<div style={{
					position: "relative", boxSizing: "border-box", width: "87%",
					display: "inline-block", verticalAlign: "middle"
				}}>
					<p style={{ marginBottom: "0", marginTop: "0.25rem" }}>
						{movie.title + " (" + movie.year + ")"}
					</p>
				</div>
			</ListGroup.Item>
		</>;
	}
}

export default SidePanelItem;