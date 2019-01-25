import React, { Component } from 'react';
import DayMiniature from './DayMiniature';

class Content extends Component {
	render() {
		// Generate a array from number of days from state
		let daysToArray = Array.from({length: this.props.state.date}, (v, k) => k); 
		const {year, month} = this.props.state;
		return (
			<div className='content'>
				{Object.keys(daysToArray).map( (day, i) => <DayMiniature id={`${day}${month}${year}`} year={year} key={day} index={day} {...this.props}/> )}
			</div>
		);
	}
}

export default Content;