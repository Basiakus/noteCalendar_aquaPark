import React, { Component } from 'react';
import Post from './Post';
import MiniCalendar from './MiniCalendar';
import uuid from 'uuid/v4';

class Day extends Component {

	//defaultChecked for checkboxes
	static defaultProps = {
		handoverChecked: false,
		lookbookChecked: false,
		postSelected: 'all'
	};
	// need state for checkbox value
	state = {
		diaryChecked: this.props.diaryChecked,
		handoverChecked: this.props.handoverChecked,
		lookbookChecked: this.props.lookbookChecked,
		postSelected: this.props.postSelected
	};

	// References for text message to grab text and form to reset after submit
	textRef = React.createRef();
	formSubmitRef = React.createRef();


	handleFormSubmit = (e) => {
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
			this.refs.formSubmitRef.reset();
			this.setState({handoverChecked: false});
			this.setState({lookbookChecked: false});
		}
	}

	// handles for set curent value of checkboxes and option
	handleChangeDiary = () => {
		this.setState({handoverChecked: false});
		this.setState({lookbookChecked: false});
	}
	handleChangeHandover = () => {
		this.setState({handoverChecked: true});
		this.setState({lookbookChecked: false});
	}
	handleChangeLookbook = () => {
		this.setState({lookbookChecked: true});
		this.setState({handoverChecked: false});
	}
	handleOptionChange = (event) => {
		this.setState({postSelected: event.target.value});
	}

	render() {
		//instance of state about current list option
		let currentListOption = this.state.postSelected;
		// all avaible posts 
		const allDayPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId);
		const handoverPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId && post.handover === true && post.lookbook === false);
		const lookbookPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId && post.lookbook === true && post.handover === false);
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

				<form ref='formSubmitRef' onSubmit={this.handleFormSubmit}>
					<textarea  ref={this.textRef} placeholder='treść nowej wiadomości'/>
					<div className="controls">
						<label id='all' ><input type="radio" defaultChecked={true} value='all' name='message' onChange={this.handleChangeDiary} />dziennik</label>
						<label id='handover' ><input type="radio" value='handover' name='message' onChange={this.handleChangeHandover} />handover</label>
						<label id='lookbook' ><input type="radio" value='lookbook' name='message' onChange={this.handleChangeLookbook} />lookbook</label>
						<input type='submit' value='zapisz'/>
					</div>
				</form>

				<span className="listSelect">
					<p>wiadomości zapisane:</p>
					<select value={this.state.postSelected} onChange={this.handleOptionChange}>
						<option value="all">all</option>
						<option value="handover">handover</option>
						<option value="lookbook">lookbook</option>
					</select>
				</span>

				<ul className={currentListOption === 'all' ? 'allPostList' : 'allPostListDeactive'}>
					{ allDayPosts.length !== 0 ? 
						allDayPosts.map( (post, i) => 
							<Post 
								key={post.uuIdDay} 
								id={post.uuIdDay} 
								index={i} 
								details={allDayPosts[i]} 
								{...this.props}
							/>
						) : 
						<li>brak wiadomości</li>
					}
				</ul>

				<ul className={currentListOption === 'handover' ? 'handoverPostList' : 'handoverPostListDeactive'}>
					{ handoverPosts.length !== 0 ? 
						handoverPosts.map( (post, i) => 
							<Post 
								key={post.uuIdDay} 
								id={post.uuIdDay} 
								index={i} 
								details={handoverPosts[i]} 
								{...this.props}
							/>
						) : 
						<li>brak wiadomości</li>
					}
				</ul>

				<ul className={currentListOption === 'lookbook' ? 'lookbookPostList' : 'lookbookPostListDeactive'}>
					{ lookbookPosts.length !== 0 ? 
						lookbookPosts.map( (post, i) => 
							<Post 
								key={post.uuIdDay} 
								id={post.uuIdDay} 
								index={i} 
								details={lookbookPosts[i]} 
								{...this.props}
							/>
						) : 
						<li>brak wiadomości</li>
					}
				</ul>

			</div>
		);
	}
}

export default Day;