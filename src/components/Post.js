import React, { Component } from 'react';

class Post extends Component {

	handleDelete = () => {
		this.props.deletePost(this.props.id);
	}


	render() {
		return (
			<li>
				<span className='number'>{this.props.index + 1}.</span>
				<span className='text'>{this.props.details.text}<p>data: {this.props.details.dayId}</p></span>
				<span className="delete" id={this.props.id} onClick={this.handleDelete}>x</span>
			</li>
		);
	}
}

export default Post;