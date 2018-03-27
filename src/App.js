import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import User from './components/User.js';
import Landing from './components/Landing';
import RoomList from './components/RoomList';
import Chat from './components/Chat';
import Profile from './components/Profile';
import './Reset.css';
import './Grid.css';
import './App.css';
import firebase, {auth, provider} from './firebase.js';

class App extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		activeRoomName: 'Pick a room',
     		activeRoomDescription: '',
     		activeRoomId: '',
     		isLoggedIn: '',
     		user: '',
     		userId: '',
     		userDisplayName: '',
     		userInfo: {},
     		guestAvatar: 'https://i.imgur.com/gOawD3s.png'
     	};

     	this.handleRoomSelect = this.handleRoomSelect.bind(this);
     	this.handleLogin = this.handleLogin.bind(this);
     	this.handleLogout = this.handleLogout.bind(this);
    }

    setUserInfo(){
    	firebase.database().ref(`users/${this.state.userId}`).on('value', snapshot => {
			const userInfo = snapshot.val();
			userInfo.key = this.state.userId;
			this.setState({				
				userDisplayName: userInfo.userDisplayName,
				userInfo: {
					userAlignment: userInfo.userAlignment,
					userAvatar: userInfo.userAvatar,
					userBio: userInfo.userBio,
					userId: userInfo.userId,
					userRole: userInfo.userRole
				}
			});
		});
    }

    componentDidMount() {
    	// Persist login state during refresh or re-render
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user: user.displayName.split(" ")[0], userId: user.uid, isLoggedIn:true });
				this.setUserInfo();
			}else{
				this.setState({ user:`Guest-${Math.floor(Math.random() * 80)}`, userDisplayName:`Guest-${Math.floor(Math.random() * 80)}`, userId: null, isLoggedIn: false})
			}
		});		
    }

    handleLogin(e) {
    	console.log("login fired")
		auth.signInWithPopup(provider).then((result) => {
			const user = result.user.displayName.split(" ")[0];
			const uid = result.user.uid;
			this.setState({ user: user, userId: uid, isLoggedIn:true });
		});
		this.setUserInfo();
    }

    handleLogout(e) {
    	console.log("logout fired")
		auth.signOut().then(() => {
			this.setState({ user:'Guest', userId:'', isLoggedIn:false });
		});
    }

	handleRoomSelect(e, selectRoomId, selectRoomName, selectRoomDescription) {
		e.preventDefault();
		this.setState({activeRoomId: selectRoomId, activeRoomName: selectRoomName, activeRoomDescription: selectRoomDescription});
	}

	render() {
	    return (
	    	<div className="App">
	        	<User
	        		isLoggedIn={this.state.isLoggedIn}
	        		userDisplayName={this.state.userDisplayName}
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
			        	<Route path="/profile" render={props => <Profile {...this.state} />} />
		        	</Switch>
		        </main>
	      	</div>
	    );
  	}
}

export default App;
