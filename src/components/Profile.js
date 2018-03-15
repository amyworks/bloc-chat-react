import React, { Component } from 'react';

class Profile extends Component {
	render() {
	    return (
	    	<section id="user-profile" className={(this.props.userLoggedIn ? "fg-col two-third show-profile" : "no-profile")}>
				<img src={this.props.userInfo.userAvatar} className="user-avatar" alt="" />
				<h2 className="username">{this.props.userInfo.username}</h2>
				<p className="user-role"><i className="fas fa-user"></i> {this.props.userInfo.userRole}</p>
				
				<div className="user-bio">
					<h3>User Bio</h3>
					<p>{this.props.userInfo.userBio}</p>
					<p><b>Alignment:</b> {this.props.userInfo.userAlignment}</p>
				</div>
	    	</section>
	    )
	}
}

export default Profile;