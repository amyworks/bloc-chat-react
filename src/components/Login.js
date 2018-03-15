import React, { Component } from 'react';

class Login extends Component {
	render() {
	    return (
	    	<section id="login" className="fg-col two-third">
			    <h3>Login</h3>
			    <form className="login-form" onSubmit={this.props.handleLogin}>
			    	<label>Email address</label>
			    	<input type="email" />
			    	<label>Password</label>
			    	<input type="password" />
			    	<input type="submit" value="Login" />
			    	<button>Forgot password</button>
			    </form>
	    	</section>
	    )
	}
}

export default Login;