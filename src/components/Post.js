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
				<span className='number'>{this.props.index + 1}.</span>
					<div className='postContent'>
							<div className='postSubContent'>
							<span className='date'>{this.props.details.editDate === '' ? `dodano: ${this.props.details.createDate}` : `edytowano: ${this.props.details.editDate}`}</span>
								<span className='type'> 
									{this.props.details.handover ? 'handover ': '' }
									{this.props.details.lookbook ? 'lookbook ': '' }
									{!this.props.details.lookbook && !this.props.details.handover ? 'notes': '' }
								</span>
							</div>
							<span className='text'>{this.props.details.text}</span>
							<div className='settings'>
								<span className='editer'onClick={this.handleEditer} >edytuj</span>
								<span className="delete" id={this.props.id} onClick={this.handleDelete}>usuń</span>
							</div>
					</div>
				<EditPoster {...this.props} isEdit={this.state.isEdit} handleCancelButton={this.handleCancelButton}/>
			</li>
		);
	}
}

export default Post;