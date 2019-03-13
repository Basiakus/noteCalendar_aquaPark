import React, { Component } from 'react';
import Post from './Post';
import MiniCalendar from './MiniCalendar';
import uuid from 'uuid/v4';

class Day extends Component {

	//defaultChecked for checkboxes
	static defaultProps = {
		checkboxNotesActive: true,
		handoverChecked: false,
		lookbookChecked: false,
		postSelected: 'all'
	};
	// need state for checkbox value
	state = {
		checkboxNotesActive: this.props.checkboxNotesActive,
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
		const date = new Date();
		const currentDate = date.toLocaleDateString('pl-PL');
		const hour = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const timeOfCreate = `${currentDate} | ${hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}`: seconds}`;
		console.log(text, dayId, uuIdDay, handover, lookbook, timeOfCreate);
		if(text === '') {
			alert('wiadomość nie może być pusta');
			return;
		} else {
			this.props.addPost(text, dayId, uuIdDay, handover, lookbook, timeOfCreate);
			this.refs.formSubmitRef.reset();
			this.setState({handoverChecked: false});
			this.setState({lookbookChecked: false});
			this.setState({checkboxNotesActive: true});
		}
	}

	// handles for set curent value of checkboxes and option 
	
	/*
	the customer wants to be able to add handover post include to lookbook list and backwards lookbook posts in handover list 
	*/
	handleChangeNotes = () => {
		this.setState({handoverChecked: false});
		this.setState({lookbookChecked: false});
		this.setState({checkboxNotesActive: !this.state.checkboxNotesActive});
	}
	handleChangeHandover = () => {
		this.setState({handoverChecked: !this.state.handoverChecked});
		//this.setState({lookbookChecked: !this.state.lookbookChecked});
	}
	handleChangeLookbook = () => {
		this.setState({lookbookChecked: !this.state.lookbookChecked});
		//this.setState({handoverChecked: !this.state.handoverChecked});
	}
	handleOptionChange = (event) => {
		this.setState({postSelected: event.target.value});
	}

	render() {
		//instance of state about current list option
		let currentListOption = this.state.postSelected;
		// all avaible posts 
		const allDayPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId);
		const notesPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId && post.handover === false && post.lookbook === false);
		const handoverPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId && post.handover === true);
		const lookbookPosts = this.props.state.posts.filter(post => post.dayId === this.props.params.dayId && post.lookbook === true);
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

				<div className='postsPanel'>


					<div className='formPanel'>	
						<form ref='formSubmitRef' onSubmit={this.handleFormSubmit}>
							<textarea  ref={this.textRef} placeholder='treść nowej wiadomości'/>
							<div className="controls">
								<label id='notes' ><input type="checkbox" defaultChecked={true} value='notes' onChange={this.handleChangeNotes} />notes</label>
								<label id='handover' ><input type="checkbox" value='handover' onChange={this.handleChangeHandover} checked={this.state.handoverChecked} disabled={(this.state.checkboxNotesActive)? "disabled" : ""} />handover</label>
								<label id='lookbook' ><input type="checkbox" value='lookbook' onChange={this.handleChangeLookbook} checked={this.state.lookbookChecked} disabled={(this.state.checkboxNotesActive)? "disabled" : ""} />lookbook</label>
								<input id='sub' type='submit' value='zapisz'/>
							</div>
						</form>
					</div>

					<div className='allLists'>
						<span className="listSelect">
							<label><input type="radio" defaultChecked={true} name='listViewer' value='all' onChange={this.handleOptionChange} />all</label>
							<label><input type="radio" name='listViewer' value='notes' onChange={this.handleOptionChange} />notes</label>
							<label><input type="radio" name='listViewer' value='handover' onChange={this.handleOptionChange} />handover</label>
							<label><input type="radio" name='listViewer' value='lookbook' onChange={this.handleOptionChange} />lookbook</label>
						</span>
						
						<ul className={currentListOption === 'all' ? 'allPostList' : 'allPostListDeactive'}>
							<h3>wiadomości zapisane:</h3>
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

						<ul className={currentListOption === 'notes' ? 'notesPostList' : 'notesPostListDeactive'}>
							<h3>wiadomości zapisane:</h3>
							{ notesPosts.length !== 0 ? 
								notesPosts.map( (post, i) => 
									<Post 
										key={post.uuIdDay} 
										id={post.uuIdDay} 
										index={i} 
										details={notesPosts[i]} 
										{...this.props}
									/>
								) : 
								<li>brak wiadomości</li>
							}
						</ul>

						<ul className={currentListOption === 'handover' ? 'handoverPostList' : 'handoverPostListDeactive'}>
							<h3>wiadomości zapisane:</h3>
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
							<h3>wiadomości zapisane:</h3>
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


				</div>
			</div>
		);
	}
}

export default Day;