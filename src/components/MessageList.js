import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: ""
    };

    // connects to database path
    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    // gives access to database data and metadata
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  createMessage(e) {
    e.preventDefault();

    if (!this.state.newMessage) {
      alert("Please enter a message");
      return;
    }

    this.messagesRef.push({
      username: "USERNAME",
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    });

    //clears field
    this.setState({ newMessage: "" });
  }

  render() {
    let roomId = this.props.activeRoom.key;
    let roomName = this.props.activeRoom.name;
    console.log(roomId, roomName);

    return (
      <div>
        <h2>Welcome to {roomName}</h2>

        <form className="ui form" onSubmit={e => this.createMessage(e)}>
          <div className="field">
            <label htmlFor="new-message">Write Message:</label>
            <input
              type="text"
              id="new-message"
              name="new-message"
              placeholder="Enter your message..."
              value={this.state.newMessage}
              onChange={e => this.handleChange(e)}
            />
            <button
              className="ui blue button"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              Send
            </button>
          </div>
        </form>
        <div />
      </div>
    );
  }
}

export default MessageList;
