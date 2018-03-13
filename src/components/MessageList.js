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
     	this.prettyTime = this.prettyTime.bind(this);
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

   	componentWillReceiveProps(prevProps, prevState) {
   		this.setState({messages:[]});
   	}

   	componentDidUpdate(prevProps, prevState) {
   		if(prevProps.roomId !== this.props.roomId) {
   			this.createMessageList();
   		}
   	}

   	prettyTime(timestamp) {
   		timestamp = parseInt(timestamp, 10);
   		let x = new Date(timestamp);
   		let H = x.getHours();
   		let MM = x.getMinutes() >= 10 ? x.getMinutes() : '0' + x.getMinutes()
   		return H + ':' + MM
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
	      							<p className="chatroom-timestamp">Sent at {this.prettyTime(`${message.sentAt}`)}</p>
	      						</div>
	      					)
	   					}
	   			</section>
   			</section>
   		);
   	}
}


export default MessageList;