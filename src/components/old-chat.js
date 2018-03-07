import React, { Component } from 'react';
import RoomList from './RoomList';
import MessageList from './MessageList';
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

class Chat extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		activeRoomName: 'Select a chat room',
     		activeRoomDescription: 'You need to join a room to see messages'
     	};
    }

	render() {
	    return (
	    	<section>
	    		<RoomList 
	    			activeRoomName={this.state.activeRoomName}
	    			activeRoomDescription={this.state.activeRoomDescription}
	    			firebase={firebase} />

	    		<section id="messages">
			        <h3>{this.state.activeRoomName}</h3>
			        <p>{this.state.activeRoomDescription}</p>
			        <section className="padded">
			        	<MessageList firebase={firebase} />
			        </section>
		        </section>
	    	</section>
	    )
	}
}

export default Chat;