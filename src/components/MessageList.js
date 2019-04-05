import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
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

  handleChange = e => {
    e.preventDefault();
    this.setState({
      username: "USERNAME",
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  };

  createMessage = e => {
    e.preventDefault();

    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.state.roomId
    });

    //clears field
    this.setState({ username: "", content: "", sentAt: "", roomId: "" });
  };

  timeChange(epoch) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(epoch * 1000);
   
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    return formattedTime;
  }

  render() {
    let messageBar = (
      <form className="ui form" onSubmit={this.createMessage}>
        <div className="field">
          <label htmlFor="new-message">Write Message:</label>
          <input
            type="text"
            id="new-message"
            name="new-message"
            placeholder="Enter your message..."
            value={this.state.content}
            onChange={this.handleChange}
          />
          <button
            className="ui blue button"
            type="submit"
            value="Send"
            onSubmit={this.handleSubmit}
          >
            Send
          </button>
        </div>
      </form>
    );

    let messageList = this.state.messages.map(message => {
      if (message.roomId === this.props.activeRoom) {
        return (
          <div className="ui segment" key={message.key}>
            <div className="ui comment">
              <div className="content">
                <h4>{message.username}</h4>
                <div className="ui metadata">
                  <span className="date">
                    Sent at: {this.timeChange(message.sentAt)}
                  </span>
                </div>
                <div className="text">
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

    return (
      <div>
        <div>{messageBar}</div>
        <div className="ui comments" />
        <div>{messageList}</div>
      </div>
    );
  }
}

export default MessageList;
