import React, { Component } from 'react';

class EditPoster extends Component {

	state = {
		notes: !this.props.details.lookbook && !this.props.details.handover ? true : false,
		lookbook: this.props.details.lookbook,
		handover: this.props.details.handover
	}

	newTextRef = React.createRef();
	formSubmitRef = React.createRef();

	handleNotes = () => {
		this.setState(
			{
				notes: !this.state.notes,
				lookbook: false,
				handover: false
			}
		);
	}

	handleLookbook = () => {
		this.setState({lookbook: !this.state.lookbook})
	}

	handleHandover = () => {
		this.setState({handover: !this.state.handover})
	}

	handleCancel = (e) => {
		e.preventDefault();
		this.setState({
			notes: !this.props.details.lookbook && !this.props.details.handover ? true : false,
			lookbook: this.props.details.lookbook,
			handover: this.props.details.handover
		});
		this.props.handleCancelButton();
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const currentPost = this.props.state.posts.findIndex( post => this.props.details.uuIdDay === post.uuIdDay); 
		const newText = this.newTextRef.current.value;
		const date = new Date();
		const currentDate = date.toLocaleDateString('pl-PL');
		const hour = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const timeOfUpdate = `${currentDate}, ${hour}:${minutes}:${seconds}`;
		if(newText === '') {
			alert('wiadomość nie może być pusta');
			return;
		} else {
			this.props.updatePost(currentPost, newText, this.state.handover, this.state.lookbook, timeOfUpdate);
			this.setState({
				notes: !this.props.details.lookbook && !this.props.details.handover ? true : false,
				lookbook: this.props.details.lookbook,
				handover: this.props.details.handover
			})
			this.props.handleCancelButton();
		}
	}

	render() {
		return (
			<div className={this.props.isEdit ? 'editPosterActive' : 'editPosterDeactive'}>
				<form ref={this.formSubmitRef} onSubmit={this.handleSubmit}>
					<textarea ref={this.newTextRef} defaultValue={`${this.props.details.text}`}></textarea>
					<div className="controls">
						<label id='notes' ><input type="checkbox" onChange={this.handleNotes} checked={this.state.notes} value='notes' />notes</label>
						<label id='handover' ><input type="checkbox" onChange={this.handleHandover} checked={this.state.handover} value='handover' disabled={(this.state.notes)? "disabled" : ""}/>handover</label>
						<label id='lookbook' ><input type="checkbox" onChange={this.handleLookbook} checked={this.state.lookbook} value='lookbook' disabled={(this.state.notes)? "disabled" : ""}/>lookbook</label>
						<input type='submit' value='zapisz'/>
					</div>
					<button onClick={this.handleCancel}>Anuluj</button>
				</form>
			</div>
		);
	}
}

export default EditPoster;