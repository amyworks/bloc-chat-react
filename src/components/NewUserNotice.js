import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewUserNotice extends Component {
	render() {
	    return (
			<section className="new-user-notice">
				<button className="dismiss" onClick={this.props.dismissNewUserNotice}><i className="fas fa-times-circle"></i></button>
				<p> Welcome to Taco Chats, <b>{this.props.userDisplayName}</b>! <Link to='/profile'>Take some time to customize your profile!</Link></p>
			</section>
		)
	}
}


export default NewUserNotice;