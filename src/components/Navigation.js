import React, { Component } from 'react';
import { getMonth } from '../helpers';
import { Link } from 'react-router';

class Navigation extends Component {

	state = {
		year: null,
		month: 0,
		date: null
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

	componentWillMount() {
		const today = new Date();
		let date;
		const currentYear = today.getFullYear();
		const currentMonth = today.getMonth() +1;
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
			date: date
		});
	}

	render() {
		return (
			<div className='navigation'>
				<ul>
					<li onClick={this.prevMonth}>prev</li>
					
					<li><Link to='/'><span>{ getMonth(this.state.month) }</span> <span>{ this.state.year }</span></Link></li>
					
					<li onClick={this.nextMonth}>next</li>
				</ul>
				{React.cloneElement(this.props.children, {state: this.state})}
			</div>
		);
	}
}

export default Navigation;