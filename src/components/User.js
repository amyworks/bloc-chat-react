import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class User extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		
     	};
    }

	render() {
	    return (
			<header className="taco-header">
		       	<nav className="main-nav clearfix">
		       		<ul>
		       			<li>Chatting as <b>{(this.props.userLoggedIn ? <Link to='/profile'>{this.props.username}</Link> : `Guest`)}</b></li>
		       			<li><Link to={'/chat'}>Chat</Link></li>
		       			<li><button className={(this.props.userLoggedIn ? 'user-logged-in' : 'user-logged-out')} onClick={(this.props.userLoggedIn ? (e) => this.props.handleLogout(e) : (e) => this.props.handleLogin(e))}>{(this.props.userLoggedIn ? `Log out` : `Log in`)}</button></li>     				
		       		</ul>
		       	</nav>
		    </header>
		)
	}
}


export default User;