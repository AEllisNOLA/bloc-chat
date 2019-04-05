import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
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

  render() {
    return (
      <div className="ui hidden divider">
        <h2>Room List</h2>
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
    );
  }
}

export default RoomList;
