import React, { Component } from 'react';
import Post from './Post';
import uuid from 'uuid/v4';


class Day extends Component {

	textRef = React.createRef();
	dayIdRef = React.createRef();

	handleSubmit = (e) => {
		e.preventDefault();
		const text = this.textRef.current.value;
		const dayId = this.props.params.dayId;
		const uuIdDay = uuid();
		console.log(text, dayId, uuIdDay);
		this.props.addPost(text, dayId, uuIdDay);
	}

	render() {
			const dayPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId);


		return (
			<div className='day'>
				<p>konkretny dzień <span>{this.props.state.currentDay + 1}</span></p> 

				<form ref="commentForm" onSubmit={this.handleSubmit}>
					<textarea  ref={this.textRef}/>
					<input type='submit' value='zapisz'/>
				</form>

				<ul className="postList">
					{dayPosts.map( post => <Post key={post.uuIdDay} text={post.text}/>)}
				</ul>

			</div>
		);
	}
}

export default Day;