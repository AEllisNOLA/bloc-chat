import React, { Component } from "react";
import moment from "moment";

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

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      username: this.props.user ? this.props.user.displayName : "Guest",
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  };

  createMessage = e => {
    e.preventDefault();

    this.messagesRef.push({
      username: this.props.user ? this.props.user.displayName : "Guest",
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.state.roomId
    });

    this.setState({ username: "", content: "", sentAt: "", roomId: "" });
  };

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

                <p>{moment(message.sentAt).calendar()}</p>
                <div className="text">
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return null;
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
