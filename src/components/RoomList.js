import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ""
    };

    // connects to database path
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    // gives access to database data and metadata
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
      console.log(this.state.rooms + " from RoomList component");
    });
  }

  createRoom(e) {
    e.preventDefault();

    // Avoids creating new chat room without a name
    if (!this.state.newRoomName) {
      alert("Please enter a room name");
      return;
    }

    // Creates room
    this.roomsRef.push({
      name: this.state.newRoomName
    });

    //clears field
    this.setState({ newRoomName: "" });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="ui segment">
          <h2>Room List</h2>
        </div>
        <div className="ui hidden divider">
          <div className="ui segment">
            <form className="ui form" onSubmit={e => this.createRoom(e)}>
              <div className="field">
                <label htmlFor="new-room">Create New Room?</label>
                <input
                  type="text"
                  name="new-room"
                  id="new-rooms"
                  placeholder="Enter New Room Name"
                  value={this.state.newRoomName}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <button className="ui blue button" type="submit" onSubmit={this.handleSubmit}>
                Create Room
              </button>
            </form>
          </div>
          <div className="ui segments">
            {this.state.rooms.map(room => {
              return (
                <div className="ui blue segment" key={room.key}>
                  {room.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default RoomList;
