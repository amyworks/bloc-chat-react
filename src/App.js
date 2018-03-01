import React, { Component } from 'react';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAzA1TCwnmOUSTD8B5f2hpcVmQsbCLwJY0",
	    authDomain: "amyworks-bloc-chat-react.firebaseapp.com",
	    databaseURL: "https://amyworks-bloc-chat-react.firebaseio.com",
	    projectId: "amyworks-bloc-chat-react",
	    storageBucket: "amyworks-bloc-chat-react.appspot.com",
	    messagingSenderId: "873840329996"
	};
	firebase.initializeApp(config);

class App extends Component {
	render() {
	    return (
	    	<div className="App">
	        	<main>
		        	<header className="taco-header">
		        		<nav className="main-nav clearfix">
		          			<ul>
		          				<li>Logged in as <b>YupAmyWorks</b></li>
		          				<li>Account</li>
		          				<li>Log out</li>       				
		          			</ul>
		          		</nav>
		        	</header>	        		
	        		<RoomList firebase={firebase}/>
		        	<section>
		        		<p>Chat stuff gonna go here</p>
		        	</section>
	        	</main>
	      	</div>
	    );
  	}
}

export default App;
