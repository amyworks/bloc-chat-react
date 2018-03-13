import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import User from './components/User.js';
import Landing from './components/Landing';
import RoomList from './components/RoomList';
import Chat from './components/Chat';
import Login from './components/Login';
import Profile from './components/Profile';
import * as firebase from 'firebase';
		// Initialize Firebase
		const config = {
			apiKey: "AIzaSyAzA1TCwnmOUSTD8B5f2hpcVmQsbCLwJY0",
		    authDomain: "amyworks-bloc-chat-react.firebaseapp.com",
		    databaseURL: "https://amyworks-bloc-chat-react.firebaseio.com",
		    projectId: "amyworks-bloc-chat-react",
		    storageBucket: "amyworks-bloc-chat-react.appspot.com",
		    messagingSenderId: "873840329996"
		};
		firebase.initializeApp(config);

class App extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		activeRoomName: 'Pick a room',
     		activeRoomDescription: '',
     		roomId: '',
     		userLoggedIn: false,     		
     		username: 'Guest'
     	};

     	this.handleRoomSelect = this.handleRoomSelect.bind(this);
     	this.handleLogin = this.handleLogin.bind(this);
     	this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(e) {
    	e.preventDefault();
    	console.log('handleLogin fired');  	
    	this.setState({userLoggedIn: true});
    }

    handleLogout(e) {
    	e.preventDefault();
    	console.log('handleLogout fired');
    	this.setState({userLoggedIn: false});
    }

	handleRoomSelect(e, selectedId, selectedName, selectedDescription) {
		e.preventDefault();
		this.setState({roomId: selectedId, activeRoomName: selectedName, activeRoomDescription: selectedDescription});
	}

	render() {
	    return (
	    	<div className="App">
	        	<User
	        		userLoggedIn={this.state.userLoggedIn}
	        		username={this.state.username}
	        		handleLogin={this.handleLogin}
	        		handleLogout={this.handleLogout}
	        		firebase={firebase} />

		        <main className="fg-full-width-row clearfix">
		        	<section id="chatrooms" className="fg-col third">
						<h1 className="taco-title">Taco Chats</h1>
						<h2 className="taco-chats">Chatroom list</h2>
						<RoomList 
							activeRoomName={this.state.activeRoomName}
							activeRoomDescription={this.state.activeRoomDescription}
							roomId={this.state.roomId}
							handleRoomSelect={this.handleRoomSelect}
							firebase={firebase} />
	        		</section>
		        	<Switch>
			        	<Route exact path="/" component={Landing} />
			        	<Route path="/chat" render={props => <Chat {...this.state} />} />
			        	<Route path="/login" component={Login} />		        	
			        	<Route path="/profile" component={Profile} />
		        	</Switch>
		        </main>
	      	</div>
	    );
  	}
}

export default App;
