import React, { Component } from 'react';
import Post from './Post';
import uuid from 'uuid/v4';


class Day extends Component {

	textRef = React.createRef();
	formSubmitRef = React.createRef();

	handleSubmit = (e) => {
		e.preventDefault();
		const text = this.textRef.current.value;
		const dayId = this.props.params.dayId;
		const uuIdDay = uuid();
		console.log(text, dayId, uuIdDay);
		if(text === '') {
			alert('wiadomość nie może być pusta');
			return;
		} else {
			this.props.addPost(text, dayId, uuIdDay);
			this.refs.formSubmitRef.reset()
		}
	}

	render() {
		
		const dayPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId);

		return (
			<div className='day'>
				<p>konkretny dzień <span>{this.props.state.currentDay + 1}</span></p> 

				<form ref='formSubmitRef' onSubmit={this.handleSubmit}>
					<textarea  ref={this.textRef} placeholder='treść nowej wiadomości'/>
					<input type='submit' value='zapisz'/>
				</form>

				<ul className="postList">
				wiadomości zapisane:



					{ dayPosts.map( (post, i) => <Post key={post.uuIdDay} id={post.uuIdDay} index={i} text={post.text} {...this.props}/>) }
				</ul>

			</div>
		);
	}
}

export default Day;