import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
	render() {
	    return (
			<header className="main">
		       	<nav className="clearfix">
		       		<ul>
		       			<li>Chatting as <b>{(this.props.userLoggedIn ? <Link to='/profile'>{this.props.username}</Link> : `Guest`)}</b></li>
		       			<li><Link to={'/chat'}>Chat</Link></li>
		       			<li>
		       				<button 
			       				className={(this.props.userLoggedIn ? 'user-logged-in' : 'user-logged-out')} 
			       				onClick={(this.props.userLoggedIn ? (e) => this.props.handleLogout(e) : null)}>
			       					{
			       						(this.props.userLoggedIn ? `Log out` : <Link to='/login'>Log in</Link>)
			       					}
			       			</button>
			       		</li>     				
		       		</ul>
		       	</nav>
		    </header>
		)
	}
}


export default User;