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

    setUserInfo(userId){
    	console.log('set user info fired');
    	if (this.state.userNew){
    		return '';
    	}else{
	    	firebase.database().ref(`users/${userId}`).on('value', snapshot => {
				const userInfo = snapshot.val();
				userInfo.key = userId;
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
    }

    componentDidMount() {
    	// Persist login state during refresh or re-render
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ userId: user.uid, isLoggedIn:true });
				this.setUserInfo(user.uid);
			}else{
				this.setState({ userDisplayName:`Guest-${Math.floor(Math.random() * 80)}`, userId:'', isLoggedIn:false, userNew: true,
					userInfo: {
     					userAvatar: 'https://i.imgur.com/gOawD3s.png'
     				}
				});
			}
		});		
    }

    handleLogin(e) {
    	console.log("login fired")
		auth.signInWithPopup(provider).then( (result) => {
			const users = firebase.database().ref(`users`);
			const uid = result.user.uid;
			users.orderByChild(`userId`).equalTo(uid).once('value', snapshot => {
				const userInfo = snapshot.val();
				// If returning user, update state with user info
				if(userInfo){
					userInfo.key = uid;
					this.setState({ 
						userId: uid, 
						isLoggedIn: true,			
						userDisplayName: userInfo.userDisplayName,
						userInfo: {
							userAlignment: userInfo.userAlignment,
							userAvatar: userInfo.userAvatar,
							userBio: userInfo.userBio,
							userId: userInfo.userId,
							userRole: userInfo.userRole
						},
						userNew: false
					});
					firebase.database().ref(`users/${uid}`).update({
						isLoggedIn: true,
					});
				}else {
					// But if user is new, create a new user profile and update state with that info
					firebase.database().ref(`users/${uid}`).set({
						isLoggedIn: true,
						userAlignment: 'Unaligned',
						userAvatar: 'https://i.imgur.com/gOawD3s.png',
						userBio: 'Write a short bio about yourself',
						userDisplayName: result.user.displayName.split(" ")[0],
						userId: uid,
						userRole: 'Taco Fresco'
					});
					this.setState({
						isLoggedIn: true,
						userInfo: {
							userAlignment: 'Unaligned',
							userAvatar: 'https://i.imgur.com/gOawD3s.png',
							userBio: 'Write a short bio about yourself',
							userDisplayName: result.user.displayName.split(" ")[0],
							userId: uid,
							userRole: 'Taco Fresco'
						}
					});
				}
			})
		});
    }

    handleLogout(e) {
    	console.log("logout fired")
		auth.signOut().then(() => {
			firebase.database().ref(`users/${this.state.userId}`).update({
				isLoggedIn: false,
			});
			this.setState({ userDisplayName:`Guest-${Math.floor(Math.random() * 80)}`, userId:'', isLoggedIn:false, 
				userInfo: {
     				userAvatar: 'https://i.imgur.com/gOawD3s.png'
     			}
     		});
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
			        	<Route path="/login" render={props => <Login {...this.state} />} />		        	
			        	<Route path="/profile" render={props => <Profile {...this.state} />} />
		        	</Switch>
		        </main>
	      	</div>
	    );
  	}
}

export default App;
