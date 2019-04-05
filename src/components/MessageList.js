import React, { Component } from "react";


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
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
      console.log(this.state.messages + " from MessageList component");
    });
  }

  render() {
    return (
      <div className="ui hidden divider">
        <div className="ui comments">
          {this.state.messages.map(message => {
            return (
              <div className="ui segment">
                <div className="comment" key={message.key}>
                  <div className="content">
                    <div className="author">{message.username}</div>
                    <div className="metadata">
                      <span>{message.sentAt}</span>
                    </div>
                    <div className="text">{message.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MessageList;
