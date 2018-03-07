import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: '',
      newRoomSlug: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms'); 
    this.handleRoomCreate = this.handleRoomCreate.bind(this);    
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleRoomCreate(e) {
    e.preventDefault();
    this.setState({newRoom: e.target.value});
  }

  createRoom(e) {
    let newRoomName = this.state.newRoom;
    let newRoomSlug = newRoomName.replace(/\s+/g, '-').toLowerCase();
    this.roomsRef.push({
      name: newRoomName,
      slug: newRoomSlug
    });
    this.setState({ newRoom: '' });
  }

  render() {
    return (
        <section>
          <ul className="room-list">
            {
              this.state.rooms.map((room) =>
                <li key={room.key} onClick={(e) => this.props.handleRoomSelect(e, room.key, room.name, room.description)}>
                  <Link key={room.key} to={{pathname:`/Chat/${room.slug}`}}>{room.name}</Link>
                </li>
              )
            }
          </ul>
          <form onSubmit={this.createRoom}>
            <input type="text" value={this.state.newRoom} placeholder="Create a new room" onChange={this.handleRoomCreate} />
            <input type="submit" value="Let's taco bout it" />
          </form>
        </section>
    );
  }
}

export default RoomList;