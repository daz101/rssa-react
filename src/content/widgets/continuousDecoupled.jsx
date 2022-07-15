import axios from "axios";
import * as d3 from 'd3';
import React, { Component } from 'react';
import { Card, Row } from "react-bootstrap";
import { API } from '../utils/constants';

class ContinuousDecoupled extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			width: 900,
			height: 0
		}
	}

	createLogoDefs(graphData, entity) {
		let logoBasedim = 54;

		const svg = d3.select('#' + entity.svgID);
		const defs = svg.select('defs');
		const logoDefs = svg.select('defs.logoDefs');

		let dropShadowFilter = defs.append('svg:filter')
			.attr('id', 'drop-shadow')
			.attr('filterUnits', "userSpaceOnUse")
			.attr('width', '500%')
			.attr('height', '500%');
		dropShadowFilter.append('svg:feGaussianBlur')
			.attr('in', 'SourceAlpha')
			.attr('stdDeviation', 9)
			.attr('result', 'blur-out');
		dropShadowFilter.append('svg:feColorMatrix')
			.attr('in', 'blur-out')
			.attr('type', 'hueRotate')
			.attr('values', 90)
			.attr('result', 'color-out');
		dropShadowFilter.append('svg:feOffset')
			.attr('in', 'color-out')
			.attr('dx', 13)
			.attr('dy', 13)
			.attr('result', 'the-shadow');
		dropShadowFilter.append('svg:feBlend')
			.attr('in', 'SourceGraphic')
			.attr('in2', 'the-shadow')
			.attr('mode', 'normal');
		graphData.forEach(d => {
			let teamImgSrc = d.poster;
			logoDefs.append('svg:pattern')
				.attr('id', `${entity.logoID}-${d.item_id}`)
				.attr('width', logoBasedim)
				.attr('height', logoBasedim)
				.attr('patternUnits', 'userSpaceOnUse')
				.append('svg:image')
				.attr('xlink:href', teamImgSrc)
				.attr('width', logoBasedim)
				.attr('height', logoBasedim)
				.attr('x', 0)
				.attr('y', 0);
		});
	}

	getData() {
		axios
			.get(API + 'disc_cont_coupled')
			.then(response => {
				const width = 900 - 54;
				const height = 270;
				this.setState({
					data: response.data,
					width: width,
					height: height
				});
				this.createLogoDefs(response.data, { svgID: 'mySvg', logoID: 'myLogo' });
				this.drawGraph(response.data, width, height - 129, 'user_score', { svgID: 'mySvg', logoID: 'myLogo' });
				this.createLogoDefs(response.data, { svgID: 'commSvg', logoID: 'commLogo' });
				this.drawGraph(response.data, width, height - 129, 'community_score', { svgID: 'commSvg', logoID: 'commLogo' });
			})
			.catch(error => {
				console.log(error);
			});
	}

	drawGraph(data, width, height, score, entity) {
		const logoBasedim = 54;
		const logoZoomDim = 270;

		const xScale = d3.scaleLinear()
			.domain([
				0, 6
			])
			.range([0, width]);

		const svg = d3.select('#' + entity.svgID);

		// Add X gridlines with labels
		const xAxis = d3.axisBottom(xScale)
			.ticks(24)
			.tickPadding(9)
			.tickSizeOuter(3)
			.tickSize(-height);

		const xAxisGroup = svg.append("g")
			.attr("transform", `translate(36, ${height + 18})`)
			.call(xAxis);

		xAxisGroup.selectAll("line").attr("stroke", "rgba(90, 90, 90, 0.5)");
		xAxisGroup.selectAll("text")
			.attr("opacity", 0.5)
			.attr("font-weight", (val => [1, 2, 3, 4, 5].includes(val) ? "bold" : "normal"))
			.attr("color", (val => [1, 2, 3, 4, 5, 6].includes(val) ? "black" : "gray"))
			.attr("font-size", (val => [1, 2, 3, 4, 5, 6].includes(val) ? "0.75rem" : "0.7rem"));

		const logoMarkers = svg.select('g.points')
			.selectAll('rect')
			.data(data, d => d.item_id);

		let toRemove;
		let toRemoveId;
		logoMarkers
			.enter()
			.append('rect')
			.attr('transform', d => `translate(${xScale(d[score])}, 0)`)
			.attr('x', 0).attr('y', height / 3)
			.attr('width', logoBasedim)
			.attr('height', logoBasedim)
			.attr('fill', d => `url(#${entity.logoID}-${d.item_id})`)
			.on('click', (evt, data) => {
				const d3Rect = d3.select(evt.target);
				const logoDefs = svg.select('defs.logoDefs');
				const imgContainer = logoDefs.select(`#${entity.logoID}-` + data.item_id);
				if (toRemove && toRemoveId) {
					const activeImgContainer = logoDefs.select(`#${entity.logoID}-${toRemoveId}`);
					activeImgContainer.attr('width', logoBasedim).attr('height', logoBasedim);
					activeImgContainer.select('image').attr('height', logoBasedim).attr('width', logoBasedim);
					d3.select(toRemove).attr('width', logoBasedim).attr('height', logoBasedim)
						.style('filter', '').lower();
				}
				imgContainer.attr('width', logoZoomDim).attr('height', logoZoomDim);
				imgContainer.select('image').attr('height', logoZoomDim).attr('width', logoZoomDim);
				d3Rect.style('fill', d => `url(#${entity.logoID}-${d.item_id})`).attr('width', logoZoomDim)
					.attr('height', logoZoomDim).style('filter', 'url(#drop-shadow)').raise();
				toRemove = evt.target;
				toRemoveId = data.item_id;
				this.props.onClickHandler(true, data)
			})
			.attr('cursor', 'pointer')
			.on('mouseover', (evt, data) => {
				const d3Rect = d3.select(evt.target);
				const logoDefs = svg.select('defs.logoDefs');
				const imgContainer = logoDefs.select(`#${entity.logoID}-` + data.item_id);
				imgContainer.attr('width', logoZoomDim).attr('height', logoZoomDim);
				imgContainer.select('image').attr('height', logoZoomDim).attr('width', logoZoomDim);
				d3Rect.style('fill', d => `url(#${entity.logoID}-${d.item_id})`).attr('width', logoZoomDim)
					.attr('height', logoZoomDim).attr('y', height / 3 - logoZoomDim / 2)
					.style('filter', 'url(#drop-shadow)').raise();
			})
			.on('mouseout', (evt, data) => {
				if ((toRemove !== evt.target) && (toRemoveId !== data.item_id)) {
					const d3Rect = d3.select(evt.target);
					const logoDefs = svg.select('defs.logoDefs');
					const imgContainer = logoDefs.select(`#${entity.logoID}-` + data.item_id);
					imgContainer.attr('width', logoBasedim).attr('height', logoBasedim);
					imgContainer.select('image').attr('height', logoBasedim).attr('width', logoBasedim);
					d3Rect.style('fill', d => `url(#${entity.logoID}-${d.item_id})`).attr('width', logoBasedim)
						.attr('height', logoBasedim)
						.attr('y', height / 3)
						.style('filter', '').lower();
				}
			});
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		let width = this.state.width + 54;
		let height = this.state.height - 63;
		console.log(height);
		return (
			<div className="viewdiv">
				<Row style={{ height: "45%" }}>
					<Card bg="light" style={{ padding: "0" }}>
						<Card.Header>
							<h3>Me</h3>
						</Card.Header>
						<Card.Body>
							<svg id="mySvg" width={width} height={height}>
								<defs className='logoDefs' />
								<g className="points" />
							</svg>
						</Card.Body>
					</Card>
				</Row>
				<Row style={{ height: "45%" }}>
					<Card bg="light" style={{ padding: "0" }}>
						<Card.Header>
							<h3>Community</h3>
						</Card.Header>
						<Card.Body>
							<svg id="commSvg" width={width} height={height}>
								<defs className='logoDefs' />
								<g className="points" />
							</svg>
						</Card.Body>
					</Card>
				</Row>
			</div>
		)
	}
}

export default ContinuousDecoupled;