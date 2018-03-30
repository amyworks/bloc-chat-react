import React, { Component } from 'react';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newAvatar: '',
			editAvatar: false,
			isURL: '',
			newDisplayName: '',
			editDisplayName:false,
			newBio: '',
			editBio: false,
			newAlignment: '',
			editAlignment: false
		}

		this.changeField = this.changeField.bind(this);
		this.updateField = this.updateField.bind(this);
		this.enterEditMode = this.enterEditMode.bind(this);
		this.exitEditMode = this.exitEditMode.bind(this);
	}

	changeField(e, field) {
		e.preventDefault();
		this.setState({[`new${field}`]: e.target.value});
	}

	updateField(e, field) {
		e.preventDefault();
		if (`new${field}` === 'newAvatar' && this.props.validateURL(this.state[`new${field}`])){
			this.props.firebase.database().ref(`users/${this.props.userId}/`).update({
				[`user${field}`]: this.state[`new${field}`]
			});
			this.setState({[`new${field}`]: '', [`edit${field}`]: false, isURL: true});

		}else if(`new${field}` === 'newAvatar' && !this.props.validateURL(this.state[`new${field}`])){
			this.setState({isURL:false});
			document.getElementById('avatar-error').innerHTML = 'Please paste in a valid url (eg https://i.imgur.com/gOawD3s.png)'
		}else if(`new${field}` !== 'newAvatar' && !this.props.validateURL(this.state[`new${field}`])){
			this.props.firebase.database().ref(`users/${this.props.userId}/`).update({
				[`user${field}`]: this.state[`new${field}`]
			});			
			this.setState({[`new${field}`]: '', [`edit${field}`]: false, isURL: true});
		}
		document.getElementById(`new${field}`).value = "";
	}

	enterEditMode(e, field) {
		e.preventDefault();
		this.setState({[`edit${field}`]: true});
	}

	exitEditMode(e, field) {
		e.preventDefault();
		this.setState({[`edit${field}`]: false, isURL: true});
	}
	
	render() {
	    return (
	    	<section id="user-profile" className={(this.props.userLoggedIn ? "fg-col two-third show-profile" : "fg-col two-third no-profile")}>
				<p className="profile-avatar"><button className="edit-avatar" onClick={(e) => this.enterEditMode(e, 'Avatar')}><i className="fas fa-pencil-alt"></i></button><img src={this.props.userInfo.userAvatar} className="user-avatar" alt="" /></p>
					<form className={this.state.editAvatar ? 'new-avatar' : 'hidden'} onSubmit={(e) => this.updateField(e, 'Avatar')}>
						<input id="newAvatar" type="text" placeholder="Paste a link to an image here" onChange={(e) => this.changeField(e, 'Avatar')} />
						<button className="form-function" type="submit"><i className="fas fa-check-circle"></i></button>
						<button className="form-function" onClick={(e) => this.exitEditMode(e, 'Avatar')}><i className="fas fa-times-circle"></i></button>
						<p id="avatar-error" className={this.state.isURL ? 'hidden' : ''}></p>
					</form>
				<h2 className="username">{this.props.userDisplayName} <button onClick={(e) => this.enterEditMode(e, 'DisplayName')}><i className="fas fa-pencil-alt"></i></button></h2>
					<form className={this.state.editDisplayName ? 'new-display-name' : 'hidden'} onSubmit={(e) => this.updateField(e, 'DisplayName')}>
						<input id="newDisplayName" type="text" onChange={(e) => this.changeField(e, 'DisplayName')} />
						<button className="form-function" type="submit"><i className="fas fa-check-circle"></i></button>
						<button className="form-function" onClick={(e) => this.exitEditMode(e, 'DisplayName')}><i className="fas fa-times-circle"></i></button>
					</form>
				<p className="user-role"><i className="fas fa-user"></i> {this.props.userInfo.userRole}</p>
				<p><b>Alignment</b> {this.props.userInfo.userAlignment} <button onClick={(e) => this.enterEditMode(e, 'Alignment')}><i className="fas fa-pencil-alt"></i></button></p>
						<form className={this.state.editAlignment ? 'new-alignment' : 'hidden'} onSubmit={(e) => this.updateField(e, 'Alignment')}>
							<input id="newAlignment" type="text" onChange={(e) => this.changeField(e, 'Alignment')} />
							<button className="form-function" type="submit"><i className="fas fa-check-circle"></i></button>
							<button className="form-function" onClick={(e) => this.exitEditMode(e, 'Alignment')}><i className="fas fa-times-circle"></i></button>
						</form>
				
				<div className="user-bio">
					<h3>User Bio <button onClick={(e) => this.enterEditMode(e, 'Bio')}><i className="fas fa-pencil-alt"></i></button></h3>
						<form className={this.state.editBio? 'new-bio' : 'hidden'} onSubmit={(e) => this.updateField(e, 'Bio')}>
							<input id="newBio" type="textarea" onChange={(e) => this.changeField(e, 'Bio')} />
							<button className="form-function" type="submit"><i className="fas fa-check-circle"></i></button>
							<button className="form-function" onClick={(e) => this.exitEditMode(e, 'Bio')}><i className="fas fa-times-circle"></i></button>
						</form>
					<p>{this.props.userInfo.userBio}</p>
				</div>
	    	</section>
	    )
	}
}

export default Profile;