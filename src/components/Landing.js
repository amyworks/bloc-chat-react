import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		
     	};
    }

	render() {
	    return (
	    	<section className="taco-landing fg-col two-third">
		    	<h1 className="taco-title">Welcome to Taco Chats</h1>
		    	<p>Whether you're a taco lover, taco hater, or tacognostic - we've got rooms for you to talk tacos. 
		    	When you're done lurking you can taco lot or just make some casual small taco and taco puns! So what are you waiting for?</p>
		    	<p><Link to='/chat'>Let's taco bout it!</Link></p>
		    </section>
	    )
	}
}

export default Landing;