import React, { Component } from 'react';
import SendMessage from './SendMessage';
import * as firebase from 'firebase';

class MessageList extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		messages: []
     	};

     	this.messagesRef = this.props.firebase.database().ref('messages');
     	this.prettyTime = this.prettyTime.bind(this);
    }

    createMessageList() {
    	this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoomId).on('child_added', snapshot => {
	    	const message = snapshot.val();
	      message.key = snapshot.key;
	      this.setState({ messages: this.state.messages.concat( message ) })
	    });
    }

    updateMessageList(roomId) {
      this.state[roomId] ? this.setState({messages: this.state[roomId]}) : this.createMessageList();
    }

    componentDidMount() {
      this.createMessageList();	    
   	}

   	componentWillReceiveProps(nextProps) {
      if(this.props.activeRoomId !== nextProps.activeRoomId) {
        let saveMessages = this.state.messages;
        this.setState({
          messages: [],
          [this.props.activeRoomId]: saveMessages
        });
      }
   	}

   	componentDidUpdate(prevProps, prevState) {
      if(prevProps.activeRoomId !== this.props.activeRoomId) {
        this.updateMessageList(this.props.activeRoomId);
   		}else if(prevProps.activeRoomId === this.props.activeRoomId) {
        return '';
      }
   	}

   	prettyTime(timestamp) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   		timestamp = parseInt(timestamp, 10);
      let x = new Date(timestamp);
      let year = x.getFullYear();
      let month = months[x.getMonth()];
      let day = days[x.getDay()];
      let date = x.getDate();
   		let hour = x.getHours();
      let meridiem = '';
        if(hour === 12) {
          meridiem = 'pm';
        }else if(hour === 0){
          hour = 12;
          meridiem = 'am';
        }else if(hour > 12){
          hour = hour - 12;
          meridiem = 'pm'
        }else{
          meridiem = 'am'
        }
   		let minutes = x.getMinutes() >= 10 ? x.getMinutes() : '0' + x.getMinutes();      
      let y = new Date();
      let z = y - x;
      let lapsed = Math.floor(z / 60000);
      timestamp = 'sent at ' + hour + ':' + minutes + meridiem + ' on ' + day + ' ' + month + ' ' + date + ', ' + year;
      lapsed = lapsed === 60 ? 'sent an hour ago' : (lapsed > 1 ? 'sent ' + lapsed + ' minutes ago' : 'sent ' + lapsed + ' minute ago');
   		return z >= 3600000 ? timestamp : lapsed;
   	}

   	render() {
   		return (
   			<section id="message-list">
   				<section className={this.props.activeRoomId === '' ? "no-messages" : "fg-col two-third-chatroom"}>
	   					{
	   						this.state.messages.map((message) =>
	      						<div className={(`${message.sentBy}` === this.props.userDisplayName ? "chatroom-message sentby-user" : "chatroom-message sentby-other")} key={message.key}>   							
  	      						<div className="message-content-fix">
                      	<p className={(`${message.sentBy}` === this.props.userDisplayName ? "chatroom-message-content sentby-user" : "chatroom-message-content sentby-other")}>
                          {message.content}<img className={`${message.attachedImg}` === null ? 'no-image' : "chatroom-image"} src={message.attachedImg} alt="" />
                        </p>
                      </div>

                      <p className="chatroom-username">
                        {(`${message.sentBy}` === this.props.userDisplayName ? '' : <img className="chatroom-avatar sentby-other" src={message.userAvatar} alt={message.sentBy} />)}
                        {(`${message.sentBy}` === this.props.userDisplayName ? `${message.sentBy}` : '')}                        
                        {(`${message.sentBy}` === this.props.userDisplayName ? '' : `${message.sentBy}`)}
                        <span className="chatroom-timestamp">{this.prettyTime(`${message.sentAt}`)}</span>
                        {(`${message.sentBy}` === this.props.userDisplayName ? <img className="chatroom-avatar sentby-user" src={message.userAvatar} alt={message.sentBy} /> : '')}
                      </p>
	      						</div>
	      					)
	   					}
	   			</section>
          {this.props.activeRoomId === '' ? '' :
            <SendMessage 
              userDisplayName={this.props.userDisplayName}
              activeRoomId={this.props.activeRoomId}
              userAvatar={this.props.userAvatar}
              guestAvatar={this.props.guestAvatar}
              isLoggedIn={this.props.isLoggedIn}
              firebase={firebase} /> }
   			</section>
   		);
   	}
}


export default MessageList;