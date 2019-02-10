import React, { Component, Fragment } from 'react';
import DayMiniature from './DayMiniature';

class Content extends Component {
	render() {
		// breacker is needed to push all days after sunday to a new row in the main calendar 
		// Generate a array from number of days from state
		let daysToArray = Array.from({length: this.props.state.date}, (v, k) => k); 
		const {year, month} = this.props.state;
		return (
			<div className='content'>
				{Object.keys(daysToArray).map( (day, i) => 
					<Fragment key={`fragment${i}`}>
						<DayMiniature 
							id={`${day < 10 ? '0' + day : day}${month < 10 ? '0' + month : month}${year}`} 
							key={day} index={day} 
							{...this.props}
						/>
						<div className='breaker' key={`breaker${i}`}></div>
					</Fragment>
				)}

			</div>
		);
	}
}

export default Content;