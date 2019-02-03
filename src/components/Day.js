import React, { Component } from 'react';
import Post from './Post';
import MiniCalendar from './MiniCalendar';
import uuid from 'uuid/v4';
//{this.props.setDayName(`${this.props.state.month}/${parseInt(this.props.state.selectedDay) + 1}/${this.props.state.year}`)}

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
		// avaible posts from database / state which was written in specific Day
		const dayPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId);

		/* refactory dayId string to pieces which represent current
		 day needed to display day's name witout using data from state 
		 (*wrong display after using navigation arrows)*/   
		const dayId = this.props.params.dayId;
		const dayFromDayId = parseInt(dayId.slice(0, 1)) + 1;
		const monthFromDayId = dayId.slice(1, 2);
		const yearFromDayId = dayId.slice(2);
		//console.log(dayPosts);
		return (
			<div className='day'>
				
				<MiniCalendar {...this.props}/>

				<span>
					<h2>{dayFromDayId}</h2>
					<h3>
						{this.props.setDayName(
							`${monthFromDayId}/${dayFromDayId}/${yearFromDayId}`
						)}
					</h3>
				</span>

				<form ref='formSubmitRef' onSubmit={this.handleSubmit}>
					<textarea  ref={this.textRef} placeholder='treść nowej wiadomości'/>
					<input type='submit' value='zapisz'/>
				</form>

				wiadomości zapisane:
				<ul className="postList">
					{ (dayPosts) ? dayPosts.map( (post, i) => 
						<Post 
							key={post.uuIdDay} 
							id={post.uuIdDay} 
							index={i} 
							details={dayPosts[i]} 
							{...this.props}
						/>
					) : "brak wiadomości"}
				</ul>

			</div>
		);
	}
}

export default Day;