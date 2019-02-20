import React, { Component } from 'react';
import EditPoster from './EditPoster';

class Post extends Component {

	handleDelete = () => {
		this.props.deletePost(this.props.id);
	}

	state = {
		isEdit: false
	}

	handleEditer = () => {
		this.setState({isEdit: !this.state.isEdit});
	}

	handleCancelButton = (e) => {
		this.setState({isEdit: false});
	}

	render() {
		return (
			<li className={
				`
					${this.props.details.handover && this.props.details.lookbook ? 'handoverAndlookbookPost' : ''}
					${!this.props.details.handover && !this.props.details.lookbook ? 'notesPost' : ''}
					${!this.props.details.handover && this.props.details.lookbook ? 'lookbookPost' : ''}
					${this.props.details.handover && !this.props.details.lookbook ? 'handoverPost' : ''}
				`
			}>
				<EditPoster {...this.props} isEdit={this.state.isEdit} handleCancelButton={this.handleCancelButton}/>
				<span className='number'>{this.props.index + 1}.</span>
				<span className='text'>{this.props.details.text}</span>
				<span>
					{this.props.details.handover ? 'handover ': '' }
					{this.props.details.lookbook ? 'lookbook ': '' }
					{!this.props.details.lookbook && !this.props.details.handover ? 'notes': '' }
				</span>
				<span>data: {this.props.details.dayId}</span>
				<span className='editer'onClick={this.handleEditer} >edit</span>
				<span className="delete" id={this.props.id} onClick={this.handleDelete}>x</span>
			</li>
		);
	}
}

export default Post;