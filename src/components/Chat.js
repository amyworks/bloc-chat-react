import React, { Component } from 'react';
import MessageList from './MessageList';
import * as firebase from 'firebase';

class Chat extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		
     	};

     	
    }

	render() {
	    return (
	    	<section>			    
          		<h3 className="chatroom-name">{this.props.activeRoomName}</h3>
          		<p>
          			{this.props.activeRoomId === '' ? "Please select a chatroom from the list on the right to start chatting!" : (this.props.activeRoomDescription === '' ? "This room doesn't have a description yet." : this.props.activeRoomDescription)}
          		</p>
				<MessageList
					activeRoomId={this.props.activeRoomId}
					activeRoomName={this.props.activeRoomName}
					userLoggedIn={this.props.userLoggedIn}
					username={this.props.username}
					userAvatar={this.props.userInfo.userAvatar}
					guestAvatar={this.props.guestAvatar}
					firebase={firebase} />
	    	</section>
	    )
	}
}

export default Chat;