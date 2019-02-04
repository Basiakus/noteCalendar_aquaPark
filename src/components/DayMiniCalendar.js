import React, { Component } from 'react';
import { Link } from 'react-router';

class DayMiniCalendar extends Component {

	render() {
		//check if specific day have a messages
		const isMessage = this.props.state.posts.findIndex(post => post.dayId === this.props.id);
		//check if day's name is equal weekend's day to add class
		const isSaturday = this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.index) + 1}/${this.props.state.year}`) === 'sob.';
		const isSunday = this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.index) + 1}/${this.props.state.year}`) === 'niedz.';

		return (
			<div 
				className={`
					${isSaturday ? 'isSaturday' : ''}
					${isSunday ? 'isSunday' : ''}
					${isMessage !== -1 ? 'isMessage' : ''}
				`}
			>
				<Link to={`/day/${this.props.id}`}>
					{this.props.index + 1}
				</Link>
			</div>
		);
	}
}

export default DayMiniCalendar;