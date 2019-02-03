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
	
	setCurrentDay = (day) => {
		const newDay = parseInt(day);
		this.setState({
			selectedDay: newDay
		});
		//set current day from a storage 
		localStorage.setItem('selectedDay', JSON.stringify(newDay));
		const date = new Date();
		const today = date.getDate();
	}


	addPost = (text, dayId, uuIdDay) => {
		const post = {
			text,
			dayId,
			uuIdDay
		};
		
		this.setState({ posts: [...this.state.posts, post]});
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
					<li onClick={this.prevMonth}>&#x2190;</li>
					
					<li><Link to='/'><span>{ getMonth(this.state.month) }</span> <span>{ this.state.year }</span></Link></li>
					
					<li onClick={this.nextMonth}>&#x2192;</li>
				</ul>
				{React.cloneElement(this.props.children, 
					{
						state: this.state, 
						setCurrentDay: this.setCurrentDay, 
						addPost: this.addPost,
						deletePost: this.deletePost,
						setDayName: this.setDayName
					}
				)}
			</div>
		);
	}
}

export default Navigation;