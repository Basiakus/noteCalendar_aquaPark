import React, { Component } from 'react';
import Content from './Content';
class Day extends Component {
	render() {
		return (
			<div className='day'>
				<p>konkretny dzień</p> <span>{this.props.state.currentDay + 1}</span>
			</div>
		);
	}
}

export default Day;