import React, { Component } from 'react';
import { Link } from 'react-router';

class DayMiniCalendar extends Component {

	render() {

		return (
			<div>
				<Link to={`/day/${this.props.id}`}>
					{this.props.index + 1}
				</Link>
			</div>
		);
	}
}

export default DayMiniCalendar;