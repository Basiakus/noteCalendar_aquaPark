import React, { Component, Fragment} from 'react';
import { Link } from 'react-router';

class DayMiniCalendar extends Component {

	render() {
		//check if specific day have a messages
		const isMessage = this.props.state.posts.findIndex(post => post.dayId === this.props.id);
		//check if day's name is equal weekend's day to add class
		const isSaturday = this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.index) + 1}/${this.props.state.year}`) === 'sob.';
		const isSunday = this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.index) + 1}/${this.props.state.year}`) === 'niedz.';

		const dayId = this.props.id;
		const dayFromDayId = parseInt(dayId.slice(0, 2));
		const monthFromDayId = dayId.slice(2, 4);
		const yearFromDayId = dayId.slice(4);

		const date = new Date();
		const today = date.getDate() - 1;
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const currentDayId = `${today < 10 ? '0' + today : today}${month < 10 ? '0' + month : month}${year}`;

		return (
				<div 
					className={`
						${currentDayId === this.props.id ? 'isToday' : ''}
						${this.props.id === this.props.params.dayId ? 'currentActive' : ''}
						${isSaturday ? 'isSaturday' : ''}
						${isSunday ? 'isSunday' : ''}
						${isMessage !== -1 ? 'isMessage' : ''}
					`}
				>
					<Link to={`/day/${this.props.id}`}>
						{this.props.index + 1}
					</Link>
					<span className='isMessageMini'>&#9993;</span>
					<span className='dayNameMini'>
						{this.props.setDayName(`${monthFromDayId}/${dayFromDayId + 1}/${yearFromDayId}`)}
					</span>
				</div>
		);
	}
}

export default DayMiniCalendar;