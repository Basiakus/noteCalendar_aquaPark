import React, { Component } from 'react';
import { getMonth } from '../helpers';
import { Link } from 'react-router';
import base from '../base.js';

class Navigation extends Component {

	state = {
		year: null,
		month: 0,
		date: null,
		selectedDay: null,
		posts: []
	}

	componentWillMount() {
		const today = new Date();
		let date;
		const currentYear = today.getFullYear();
		const currentMonth = today.getMonth() +1;
		//const dataPosts = posts;
		if(currentMonth < 1){
			date = 31;
		} else {
			if(currentMonth === 2){
				date = 28
			} else if(currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12) {
				date = 31;
			} else {
				date = 30;
			}
		}
		this.setState({
			year: currentYear,
			month: currentMonth,
			date: date,
			//get current day from a storage after refreshing page
			selectedDay: JSON.parse(localStorage.getItem('selectedDay')),
			//posts: dataPosts

		});
	}

	componentDidMount() {
		this.ref = base.syncState('messages', {
			context: this,
			state: "posts",
			asArray: true
		});

		const date = new Date();
		const today = date.getDate() - 1;
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		this.props.router.push(`/day/${today < 10 ? '0' + today : today}${month < 10 ? '0' + month : month}${year}`);
	}

	componentWilUnmount() {
		base.removeBinding(this.ref);
	}

	nextMonth = () => {
		let date = this.state.date;
		let month = this.state.month +1;
		let year = this.state.year;

		if(month > 12){
			year = year +1;
			date = 31;
			month = 1;
		} else {
			if(month === 2){
				date = 28
			} else if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
				date = 31;
			} else {
				date = 30;
			}
		}
		this.setState({
			date,
			year,
			month
		});
	}

	prevMonth = () => {
		let date = this.state.date;
		let month = this.state.month -1;
		let year = this.state.year;

		if(month < 1){
			year = year -1;
			date = 31;
			month = 12;
		} else {
			if(month === 2){
				date = 28
			} else if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
				date = 31;
			} else {
				date = 30;
			}
		}
		this.setState({
			date,
			year,
			month
		});
	}

	setDayName = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('pl-PL', { weekday: 'short' });    
	}
	
	addPost = (text, dayId, uuIdDay, handover, lookbook) => {
		const post = {
			text,
			dayId,
			uuIdDay,
			handover,
			lookbook
		};
		
		this.setState({ posts: [...this.state.posts, post]});
	}

	updatePost = (postIndex, newText, newHandover, newLookbook) => {
		const posts = [...this.state.posts];
		posts[postIndex].text = newText;
		posts[postIndex].handover = newHandover;
		posts[postIndex].lookbook = newLookbook;

		this.setState({posts});
	}

	deletePost = (uuId) => {
		const posts = [...this.state.posts];
		const newPosts = posts.filter( post => post.uuIdDay !== uuId );
		this.setState({
			posts: newPosts
		});
	}

	render() {
		return (
			<div className='navigation'>
				<ul>
					<li onClick={this.prevMonth}>&#60;</li>
					
					<li><Link to='/'><span>{ getMonth(this.state.month) }</span> <span>{ this.state.year }</span></Link></li>
					
					<li onClick={this.nextMonth}>&#62;</li>
				</ul>
				{React.cloneElement(this.props.children, 
					{
						state: this.state, 
						addPost: this.addPost,
						updatePost: this.updatePost,
						deletePost: this.deletePost,
						setDayName: this.setDayName
					}
				)}
			</div>
		);
	}
}

export default Navigation;