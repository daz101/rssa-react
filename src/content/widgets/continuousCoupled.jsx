import axios from "axios";
import * as d3 from 'd3';
import React, { Component } from 'react';
import { API } from '../utils/constants';

class ContinuousCoupled extends Component {

	constructor(props) {
		super(props)

		this.state = {
			data: [],
			width: 900,
			height: 800
		}
	}

	createLogoDefs(graphData) {
		let logoBasedim = 54;

		const svg = d3.select('#mySvg');
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
				.attr('id', `teamlogo-${d.item_id}`)
				.attr('width', logoBasedim)
				.attr('height', logoBasedim)
				.attr('patternUnits', 'userSpaceOnUse')
				.append('svg:image')
				.attr('xlink:href', teamImgSrc)
				.attr('width', logoBasedim)
				.attr('height', logoBasedim)
				.attr('x', 0)
				.attr('y', 0);
			// .attr('r', logoRadius/4)
			// .attr('cx', 0)
			// .attr('cy', 0);
		});
	}

	getData() {
		axios
			.get(API + 'disc_cont_coupled')
			.then(response => {
				const width = 800;
				const height = 630;
				this.setState({
					data: response.data,
					width: width,
					height: height
				});
				this.createLogoDefs(response.data);
				this.drawGraph(response.data, width, height);
			})
			.catch(error => {
				console.log(error);
			});
	}

	drawGraph(data, width, height) {
		const logoBasedim = 54;
		const logoZoomDim = 270;



		const xScale = d3.scaleLinear()
			.domain([
				0, 6
			])
			.range([0, width]);
		const yScale = d3.scaleLinear()
			.domain([
				0, 6
			])
			.range([height, 0]);

		let svg = d3.select('#mySvg');

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

		// Add Y grid lines with labels
		const yAxis = d3.axisLeft(yScale)
			.ticks(24)
			.tickPadding(9)
			.tickSizeOuter(3)
			.tickSize(-width);

		const yAxisGroup = svg.append("g")
			.attr('transform', `translate(36, 18)`)
			.call(yAxis);

		yAxisGroup.selectAll("line").attr("stroke", "rgba(90, 90, 90, 0.5)");
		yAxisGroup.selectAll("text")
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
			.attr('transform', d => `translate(${xScale(d.user_score)}, ${yScale(d.community_score)})`)
			.attr('x', 0).attr('y', 0)
			// .attr('cx', logoRadius / 4).attr('cy', logoRadius / 4)
			// .attr('r', Math.sqrt(Math.pow(logoRadius, 2) + Math.pow(logoRadius, 2) / 2))
			// .attr('r', logoRadius / 4)
			.attr('width', logoBasedim)
			.attr('height', logoBasedim)
			.attr('fill', d => `url(#teamlogo-${d.item_id})`)
			.on('click', (evt, data) => {
				const d3Rect = d3.select(evt.target);
				const logoDefs = d3.select('#mySvg').select('defs.logoDefs');
				const imgContainer = logoDefs.select('#teamlogo-' + data.item_id);
				if (toRemove && toRemoveId) {
					const activeImgContainer = logoDefs.select(`#teamlogo-${toRemoveId}`);
					activeImgContainer.attr('width', logoBasedim).attr('height', logoBasedim);
					activeImgContainer.select('image').attr('height', logoBasedim).attr('width', logoBasedim);
					d3.select(toRemove).attr('width', logoBasedim).attr('height', logoBasedim).lower();
				}
				imgContainer.attr('width', logoZoomDim).attr('height', logoZoomDim);
				imgContainer.select('image').attr('height', logoZoomDim).attr('width', logoZoomDim);
				d3Rect.style('fill', d => `url(#teamlogo-${d.item_id})`).attr('width', logoZoomDim)
					.attr('height', logoZoomDim).style('filter', 'url(#drop-shadow)').raise();
				toRemove = evt.target;
				toRemoveId = data.item_id;
				this.props.onClickHandler(true, data)
			})
			.attr('cursor', 'pointer')
			.on('mouseover', (evt, data) => {
				const d3Rect = d3.select(evt.target);
				const logoDefs = d3.select('#mySvg').select('defs.logoDefs');
				const imgContainer = logoDefs.select('#teamlogo-' + data.item_id);
				imgContainer.attr('width', logoZoomDim).attr('height', logoZoomDim);
				imgContainer.select('image').attr('height', logoZoomDim).attr('width', logoZoomDim);
				d3Rect.style('fill', d => `url(#teamlogo-${d.item_id})`).attr('width', logoZoomDim)
					.attr('height', logoZoomDim).style('filter', 'url(#drop-shadow)').raise();
			})
			.on('mouseout', (evt, data) => {
				if ((toRemove !== evt.target) && (toRemoveId !== data.item_id)) {
					const d3Rect = d3.select(evt.target);
					const logoDefs = d3.select('#mySvg').select('defs.logoDefs');
					const imgContainer = logoDefs.select('#teamlogo-' + data.item_id);
					imgContainer.attr('width', logoBasedim).attr('height', logoBasedim);
					imgContainer.select('image').attr('height', logoBasedim).attr('width', logoBasedim);
					d3Rect.style('fill', d => `url(#teamlogo-${d.item_id})`).attr('width', logoBasedim)
						.attr('height', logoBasedim).lower();
				}
			});
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		let width = this.state.width + 54;
		let height = this.state.height + 54;

		return (
			<div className="viewdiv">
				<svg id="mySvg" width={width} height={height}>
					<defs className='logoDefs' />
					<g className="points" />
				</svg>
			</div>

		)
	}
}

export default ContinuousCoupled;