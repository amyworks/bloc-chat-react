import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		messages: [],
     		user: '',
     		content: '',
     		msgType: '',
     		sentAt: ''
     	};

     	this.messagesRef = this.props.firebase.database().ref('messages');
    }

    createMessageList() {
    	this.messagesRef.orderByChild('roomId').equalTo(this.props.roomId).on('child_added', snapshot => {
	    	const message = snapshot.val();
	       	message.key = snapshot.key;
	       	this.setState({ messages: this.state.messages.concat( message ) })
	    });
    }

    componentDidMount() {
	    this.createMessageList();	    
   	}

   	componentDidUpdate(prevProps, prevState) {
   		if(prevProps.roomId !== this.props.roomId) {
   			this.setState({messages:[]});
   			this.createMessageList();
   		}
   	}

   	render() {
   		return (
   			<section id="message-list">
   				<section className={this.props.roomId === '' ? "no-messages" : "fg-col two-third-chatroom"}>
	   					{
	   						this.state.messages.map((message) =>
	      						<div className="chatroom-message" key={message.key}>
	      							<p className="chatroom-username">{message.username}</p>	      							
	      							<p className="chatroom-message-content">{message.content}<img className={`${message.attachedImg}` === null ? 'no-image' : "chatroom-image"} src={message.attachedImg} alt="" /></p>	      								      							
	      							<p className="chatroom-timestamp">Sent at {message.sentAt}</p>
	      						</div>
	      					)
	   					}
	   			</section>
   			</section>
   		);
   	}
}


export default MessageList;