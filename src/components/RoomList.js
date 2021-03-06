import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRoom(e) {
    e.preventDefault();

    if (!this.state.newRoomName) {
      alert("Please enter a room name");
      return;
    }

    this.roomsRef.push({
      name: this.state.newRoomName
    });

    this.setState({ newRoomName: "" });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    let createRoomForm = (
      <div className="ui segment">
        <form className="ui form" onSubmit={e => this.createRoom(e)}>
          <div className="field">
            <label htmlFor="new-room">Create New Room?</label>
            <input
              type="text"
              name="new-room"
              id="new-room"
              placeholder="Enter new room name..."
              value={this.state.newRoomName}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <button
            className="ui blue button"
            type="submit"
            onSubmit={this.handleSubmit}
          >
            Create Room
          </button>
        </form>
      </div>
    );

    let listRooms = (
      <div>
        <div className="ui segment">
          <h2>Room List</h2>

          
          <h3>
            {this.props.activeRoom ? `Current Room: ${this.props.activeRoom.name}` : "Select Room"}
          </h3>
        </div>
        <div className="ui hidden divider">
          <div className="ui segments">
            {this.state.rooms.map(room => {
              return (
                <div
                  className="ui blue segment"
                  key={room.key}
                  onClick={() => this.props.setActiveRoom(room)}
                >
                  {room.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div>{createRoomForm}</div>
        <div>{listRooms}</div>
      </div>
    );
  }
}

export default RoomList;
