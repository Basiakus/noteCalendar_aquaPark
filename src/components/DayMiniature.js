import React, { Component } from 'react';

class DayMiniature extends Component {
	render() {
		return (
			<div className='dayMiniature'>
				<p>dzień</p> <span>{Number(this.props.index) + 1}</span>
			</div>
		);
	}
}

export default DayMiniature;