import React, { Component } from 'react';
import { getMonth } from '../helpers';
import { Link } from 'react-router';
import posts from '../data/posts.js';

class Navigation extends Component {

	state = {
		year: null,
		month: 0,
		date: null,
		currentDay: null,
		posts: []
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

	setCurrentDay = (day) => {
		const newDay = parseInt(day);
		this.setState({
			currentDay: newDay
		});
		//set current day from a storage 
		localStorage.setItem('currentDay', JSON.stringify(newDay));
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

	componentWillMount() {
		const today = new Date();
		let date;
		const currentYear = today.getFullYear();
		const currentMonth = today.getMonth() +1;
		const dataPosts = [...posts];
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
			currentDay: JSON.parse(localStorage.getItem('currentDay')),
			posts: JSON.parse(localStorage.getItem('posts')) || dataPosts

		});
	}

	componentDidUpdate() {
		const currentPosts = [...this.state.posts]
		localStorage.setItem('posts', JSON.stringify(currentPosts));
	}

	render() {
		return (
			<div className='navigation'>
				<ul>
					<li onClick={this.prevMonth}>prev</li>
					
					<li><Link to='/'><span>{ getMonth(this.state.month) }</span> <span>{ this.state.year }</span></Link></li>
					
					<li onClick={this.nextMonth}>next</li>
				</ul>
				{React.cloneElement(this.props.children, 
					{
						state: this.state, 
						setCurrentDay: this.setCurrentDay, 
						addPost: this.addPost,
						deletePost: this.deletePost
					}
				)}
			</div>
		);
	}
}

export default Navigation;