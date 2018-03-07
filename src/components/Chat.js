import React, { Component } from 'react';
import MessageList from './MessageList';
import * as firebase from 'firebase';

class Chat extends Component {
	render() {
	    return (
	    	<section>			    
          		<h3 className="chatroom-name">{this.props.activeRoomName}</h3>
          		<p>
          			{this.props.roomId === '' ? "Please select a chatroom from the list on the right to start chatting!" : (this.props.activeRoomDescription === '' ? "This room doesn't have a description yet." : this.props.activeRoomDescription)}
          		</p>
				<MessageList
					activeRoomName={this.props.activeRoomName}
					roomId={this.props.roomId}
					firebase={firebase} />
	    	</section>
	    )
	}
}

export default Chat;