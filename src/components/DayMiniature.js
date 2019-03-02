import React, { Component } from 'react';
import { Link } from 'react-router';

class DayMiniature extends Component {


	render() {
		//check if specific day have a messages
		const check = this.props.state.posts.findIndex(post => post.dayId === this.props.id);

		// variables needed to check which day is today to add class
		const date = new Date();
		const today = date.getDate();
		const currentMonth = date.getMonth();
		const currentYear = date.getFullYear();

		//check if day's name is equal weekend's day to add class
		const isSaturday = this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.index) + 1}/${this.props.state.year}`) === 'sob.';
		const isSunday = this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.index) + 1}/${this.props.state.year}`) === 'niedz.';
		return (
			<div 
				className={
					`
						${check !== -1 ? 'dayMiniatureWithMessage' : 'dayMiniature'}

						${parseInt(this.props.index) + 1 === today 
							&& currentMonth + 1 === this.props.state.month 
							&& currentYear === this.props.state.year ? 
							'dayMiniatureIsToday' :	 'dayMiniature'	}

						${ isSaturday ? 'dayMiniatureSaturday' : ''}

						${ isSunday ? 'dayMiniatureSunday' : ''}

						${ parseInt(this.props.index) === this.props.state.date - 1 ? 'dayTofLeft' : ''}

						${ parseInt(this.props.index) === 0 ? 'dayToRight' : ''}
					`


				} 
			>
				<Link to={`/day/${this.props.id}`}>
					<span id="numberOfDay">{Number(this.props.index) + 1}</span>
					<span id="nameOfday">{this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.index) + 1}/${this.props.state.year}`)}</span>
					<span id="envelope">&#9993;!</span>
				</Link>
			</div>
		);
	}
}

export default DayMiniature;