import React, { Component } from 'react';

class Day extends Component {
	render() {
		return (
			<div className='day'>
				<p>konkretny dzień</p> <span>{Number(this.props.state.index) + 1}</span>
			</div>
		);
	}
}

export default Day;