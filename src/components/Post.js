import React, { Component } from 'react';

class Post extends Component {

	handleDelete = () => {
		this.props.deletePost(this.props.id);
	}

	render() {
		return (
			<li>
				<span>{this.props.index + 1}</span>
				<span>{this.props.text}</span>
				<span className="delete" id={this.props.id} onClick={this.handleDelete}>x</span>
			</li>
		);
	}
}

export default Post;