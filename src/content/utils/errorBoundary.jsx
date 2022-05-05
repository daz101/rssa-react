import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error){
		return {hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// console.log(error, errorInfo);
		// logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError){
			return (
				<div className="jumbotron">
					<h1>Something Went Wrong.</h1>
					<p>Let's start over? &nbsp;
						<span>
							<Link to="/">
								Take the survey again.
							</Link>
						</span>
					</p>
				</div>
			)
		}
		return this.props.children;
	}
}

export default ErrorBoundary;