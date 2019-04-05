import React, { Component } from "react";
import * as firebase from "firebase";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDN_QsXTay0N5GT_6i_SUgqQegjQNPcRYw",
  authDomain: "bloc-chat-anthony-ellis.firebaseapp.com",
  databaseURL: "https://bloc-chat-anthony-ellis.firebaseio.com",
  projectId: "bloc-chat-anthony-ellis",
  storageBucket: "bloc-chat-anthony-ellis.appspot.com",
  messagingSenderId: "858385269513"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ""
    };
  }

  setActiveRoom = (room) => {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <div className="ui grid">
          <div className="four wide column">
            <RoomList
              firebase={firebase}
              setActiveRoom={room => this.setActiveRoom(room)}
              activeRoom={this.state.activeRoom}
            />
          </div>

          <div className="eleven wide column">
            <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom.key}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
