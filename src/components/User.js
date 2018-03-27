import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
	render() {
	    return (
			<header className="main">
		       	<nav className="clearfix">
		       		<ul>
		       			<li>Chatting as <b>{this.props.isLoggedIn ? <Link to='/profile'>{this.props.userDisplayName}</Link> : `Guest`}</b></li>
		       			<li><Link to={'/chat'}>Chat</Link></li>
		       			<li>
		       				<button 
			       				className={this.props.isLoggedIn ? 'user-logged-in' : 'user-logged-out'} 
			       				onClick={this.props.isLoggedIn ? (e) => this.props.handleLogout(e) : (e) => this.props.handleLogin(e)}>
			       				{this.props.isLoggedIn ? 'Logout' : 'Login'}
			       			</button>
			       		</li>     				
		       		</ul>
		       	</nav>
		    </header>
		)
	}
}


export default User;