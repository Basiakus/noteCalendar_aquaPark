import React, { Component } from 'react';
import DayMiniCalendar from './DayMiniCalendar';

class MiniCalendar extends Component {
	render() {
		const days = this.props.state.date;
		const daysToArray = Array.from({length: days}, (v, k) => k); 
		const {month, year} = this.props.state;
		return (
			<div className='miniCalendar'>
				{daysToArray.map( day =>  
					<DayMiniCalendar 
						key={day} 
						index={day}
						id={`${day}${month}${year}`} 
						{...this.props}
					/>
				)}
			</div>
		);
	}
}

export default MiniCalendar;