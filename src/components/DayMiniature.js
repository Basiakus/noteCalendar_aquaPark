import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

class DayMiniature extends Component {


	render() {
		//check if specific day have a messages
		const check = this.props.state.posts.findIndex(post => post.dayId === this.props.id);
		const date = new Date();
		const today = date.getDate();
		const currentMonth = date.getMonth();
		const currentYear = date.getFullYear();

		//check if day's name is equal weekend's day
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
							'dayMiniatureIsToday' :	 ''	}

						${ isSaturday ? 'dayMiniatureSaturday' : 'dayMiniature'}

						${ isSunday ? 'dayMiniatureSunday' : 'dayMiniature'}
					`


				} 
			>
				<Link to={`/day/${this.props.id}`}>
					<span>{Number(this.props.index) + 1}</span>
					<span>{this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.index) + 1}/${this.props.state.year}`)}</span>
				</Link>
			</div>
		);
	}
}

export default DayMiniature;