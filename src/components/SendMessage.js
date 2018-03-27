import React, { Component } from 'react';

class SendMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageContent: '',
			isImageLink: false
		}

		this.messagesRef = this.props.firebase.database().ref('messages');
		this.newMessage = this.newMessage.bind(this);
		this.setMessageType = this.setMessageType.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	newMessage(e) {
		e.preventDefault();
		this.setState({messageContent: e.target.value});
	}

	setMessageType (e) {
		e.preventDefault();
		this.setState({isImageLink: !this.state.isImageLink});
	}

	sendMessage(e) {
		e.preventDefault();
		let d = new Date();
		let attachedImg = this.state.isImageLink ? this.state.messageContent : null; 
		let content = this.state.isImageLink ? null : this.state.messageContent;
		const sentAt = d.getTime();
		const sentBy = this.props.userDisplayName;
		const userAvatar = this.props.isLoggedIn ? this.props.userAvatar : this.props.guestAvatar;
		const roomId = this.props.activeRoomId;
		this.messagesRef.push({
			attachedImg: attachedImg,
			content: content,
			sentAt: sentAt,
			sentBy: sentBy,
			userAvatar: userAvatar,
			roomId: roomId
		});
		this.setState({
			messageContent: '',
			isImageLink: false
		})
	}

	render() {
	    return (
			<section id="send-message" className="fg-col two-third-send-message">
				<form onSubmit={this.sendMessage}>
					<input type="text" placeholder="Write a message here" onChange={this.newMessage} />
					<button className={this.state.isImageLink ? 'image-linked' : 'text-message'} onClick={(e) => this.setMessageType(e)}>
						<span className="fas fa-file-image"></span>
					</button>
					<input type="submit" />
					<p>To send a picture message, paste ONLY a link to your image and click the <span className="fas fa-file-image"></span> button to the right of the text field</p>
				</form>
		    </section>
		)
	}
}


export default SendMessage;