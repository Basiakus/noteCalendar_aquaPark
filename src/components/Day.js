import React, { Component } from 'react';
import Post from './Post';
import MiniCalendar from './MiniCalendar';
import uuid from 'uuid/v4';

class Day extends Component {

	//defaultChecked for checkboxes
	static defaultProps = {
		handoverChecked: false,
		lookbookChecked: false
	};
	// need state for checkbox value
	state = {
		handoverChecked: this.props.handoverChecked,
		lookbookChecked: this.props.lookbookChecked
	};

	// References for text message to grab text and form to reset after submit
	textRef = React.createRef();
	formSubmitRef = React.createRef();


	handleSubmit = (e) => {
		e.preventDefault();
		const text = this.textRef.current.value;
		const dayId = this.props.params.dayId;
		const uuIdDay = uuid();
		const handover = this.state.handoverChecked;
		const lookbook = this.state.lookbookChecked;
		console.log(text, dayId, uuIdDay, handover, lookbook);
		if(text === '') {
			alert('wiadomość nie może być pusta');
			return;
		} else {
			this.props.addPost(text, dayId, uuIdDay, handover, lookbook);
			this.refs.formSubmitRef.reset()
		}
	}

	// handles for set curent value of checkboxes
	handleChangeHandover = () => {
		this.setState({handoverChecked: !this.state.handoverChecked});
	}
	handleChangeLookbook = () => {
		this.setState({lookbookChecked: !this.state.lookbookChecked});
	}

	render() {
		// avaible posts from database / state which was written in specific Day
		const dayPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId);

		/* refactory dayId string to pieces which represent current
		 day needed to display day's name witout using data from state 
		 (*wrong display after using navigation arrows)*/   
		const dayId = this.props.params.dayId;
		const dayFromDayId = parseInt(dayId.slice(0, 2));
		const monthFromDayId = dayId.slice(3, 4);
		const yearFromDayId = dayId.slice(4);
		//console.log(dayPosts);
		return (
			<div className='day'>
				
				<MiniCalendar {...this.props}/>

				<span>
					<h2>{dayFromDayId + 1}</h2>
					<h3>
						{this.props.setDayName(
							`${monthFromDayId}/${dayFromDayId + 1}/${yearFromDayId}`
						)}
					</h3>
				</span>

				<form ref='formSubmitRef' onSubmit={this.handleSubmit}>
					<textarea  ref={this.textRef} placeholder='treść nowej wiadomości'/>
					<div className="controls">
						<label><input type="checkbox" defaultChecked={this.state.checked} onChange={this.handleChangeHandover} />handover</label>
						<label><input type="checkbox" defaultChecked={this.state.checked} onChange={this.handleChangeLookbook} />lookbook</label>
						<input type='submit' value='zapisz'/>
					</div>
				</form>

				wiadomości zapisane:
				<ul className="postList">
					{ dayPosts.length !== 0 ? dayPosts.map( (post, i) => 
						<Post 
							key={post.uuIdDay} 
							id={post.uuIdDay} 
							index={i} 
							details={dayPosts[i]} 
							{...this.props}
						/>
					) : <li>brak wiadomości</li>}
				</ul>

			</div>
		);
	}
}

export default Day;