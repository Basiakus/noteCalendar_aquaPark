import React, { Component } from 'react';
import { Link } from 'react-router';

class DayMiniature extends Component {

	handleClick = () => {
		this.props.setCurrentDay(this.props.index);
	}

	render() {
		return (
			<div className='dayMiniature' onClick={(this.handleClick)}>
				<Link to={`/day/${this.props.id}`}><p>dzień</p> <span>{Number(this.props.index) + 1}</span></Link>
			</div>
		);
	}
}

export default DayMiniature;