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
		if(`new${field}` === 'newBio'){
			this.characterCountDown();
		};
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
		document.getElementById(`${field}`).value = '';
		document.getElementById('chars-remaining').innerHTML = '';
	}

	enterEditMode(e, field) {
		e.preventDefault();
		this.setState({[`edit${field}`]: true});
	}

	exitEditMode(e, field) {
		e.preventDefault();
		this.setState({[`edit${field}`]: false, isURL: true});
		document.getElementById(`new${field}`).value = "";		
		document.getElementById('chars-remaining').innerHTML = '';
	}

	characterCountDown() {
		let charsRemaining = 999;
		let newBio = this.state.newBio;
		document.getElementById('chars-remaining').innerHTML = `${charsRemaining - newBio.length} characters remaining`
	}
	
	render() {
	    return (
			<section id="user-profile" className={(this.props.userLoggedIn ? "fg-col two-third show-profile" : "fg-col two-third no-profile")}>
				<p className="profile-avatar"><img src={this.props.userInfo.userAvatar} className="user-avatar" alt="" /><button className="edit-avatar" onClick={(e) => this.enterEditMode(e, 'Avatar')}><i className="fas fa-pencil-alt"></i></button></p>
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
						<select id="Alignment" onChange={(e) => this.changeField(e, 'Alignment')}>
							<option value="Neutral Taco">Neutral Taco</option>
							<option value="Lawful Neutral Taco">Lawful Neutral Taco</option>
							<option value="Chaotic Neutral Taco">Chaotic Neutral Taco</option>
							<option value="Neutral Taco Good">Neutral Taco Good</option>
							<option value="Lawful Taco Good">Lawful Taco Good</option>
							<option value="Chaotic Taco Good">Chaotic Taco Good</option>
							<option value="Lawful Taco Evil">Lawful Taco Evil</option>
							<option value="Neutral Taco Evil">Neutral Taco Evil</option>
							<option value="Chaotic Taco Evil">Chaotic Taco Evil</option>
						</select>
						<button className="form-function" type="submit"><i className="fas fa-check-circle"></i></button>
						<button className="form-function" onClick={(e) => this.exitEditMode(e, 'Alignment')}><i className="fas fa-times-circle"></i></button>
					</form>
				
				<div className="user-bio">
					<h3>User Bio <button onClick={(e) => this.enterEditMode(e, 'Bio')}><i className="fas fa-pencil-alt"></i></button></h3>
						<form className={this.state.editBio ? 'new-bio' : 'hidden'} onSubmit={(e) => this.updateField(e, 'Bio')}>
							<textarea id="newBio" onChange={(e) => this.changeField(e, 'Bio')} maxLength="1000" />
							<p id="chars-remaining"></p>
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