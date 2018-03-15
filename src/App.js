import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import User from './components/User.js';
import Landing from './components/Landing';
import RoomList from './components/RoomList';
import Chat from './components/Chat';
import Login from './components/Login';
import Profile from './components/Profile';
import './Reset.css';
import './Grid.css';
import './App.css';
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
     		activeRoomId: '',
     		userLoggedIn: true,
     		username: 'YupAmyWorks',
     		userId: 'tUt9kL6BozeeqQieJdx30jPpdVv2',
     		userInfo: {},
     		guestAvatar: 'https://i.imgur.com/gOawD3s.png'
     	};

     	this.usersRef = firebase.database().ref('/users/' + this.state.userId);
     	this.handleRoomSelect = this.handleRoomSelect.bind(this);
     	this.handleLogin = this.handleLogin.bind(this);
     	this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
		this.usersRef.once('value').then(snapshot => {
			const user = snapshot.val();
			user.key = snapshot.key;
			this.setState({userInfo:
				{
					userAlignment: user.userAlignment,
					userAvatar: user.userAvatar,
					userBio: user.userBio,
					userId: user.userId,
					userRole: user.userRole,
					username: user.username
				}
			});
		});
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

	handleRoomSelect(e, selectRoomId, selectRoomName, selectRoomDescription) {
		e.preventDefault();
		this.setState({activeRoomId: selectRoomId, activeRoomName: selectRoomName, activeRoomDescription: selectRoomDescription});
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
		        	<section id="chatroom-list" className="fg-col third">
						<RoomList 
							activeRoomName={this.state.activeRoomName}
							activeRoomDescription={this.state.activeRoomDescription}
							activeRoomId={this.state.activeRoomId}
							handleRoomSelect={this.handleRoomSelect}
							firebase={firebase} />
	        		</section>
		        	<Switch>
			        	<Route exact path="/" component={Landing} />
			        	<Route path="/chat" render={props => <Chat {...this.state} />} />
			        	<Route path="/login" render={props => <Login {...this.state} />} />		        	
			        	<Route path="/profile" render={props => <Profile {...this.state} />} />
		        	</Switch>
		        </main>
	      	</div>
	    );
  	}
}

export default App;
