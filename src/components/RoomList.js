import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props) {
     	super(props);
     	this.state = {
     		rooms: [],
     		newRoom: ''
     	};

     	this.roomsRef = this.props.firebase.database().ref('rooms');
     	this.handleChange = this.handleChange.bind(this);
     	this.createRoom = this.createRoom.bind(this);
    }

    componentDidMount() {
	    this.roomsRef.on('child_added', snapshot => {
	    	const room = snapshot.val();
	       	room.key = snapshot.key;
	       	this.setState({ rooms: this.state.rooms.concat( room ) })
	    });
   	}

   	handleChange(e) {
   		this.state.newRoom = this.setState({newRoom: e.target.value});
   	}

   	createRoom(e) {   		
   		let newRoomName = this.state.newRoom;
   		this.roomsRef.push({
  			name: newRoomName
		});
		this.setState({newRoom: ''});
   	}

    render() {
    	return (
		     <section id="chatrooms" className="fg-col third clearfix">
		     	<h1 className="taco-title">Taco Chats</h1>
		     	<h2>Chatroom list</h2>
		     	<ul className="room-list">
				    {
				    	this.state.rooms.map((room) =>
      						<li key={room.key}>{room.name}</li>
    					)
    				}
				</ul>
				<form onSubmit={this.createRoom}>
					<input type="text" value={this.state.newRoom} placeholder="Create a new room" onChange={this.handleChange} />
					<input type="submit" value="Let's taco bout it" />
				</form>
		     </section>
		);
    }
}

export default RoomList;