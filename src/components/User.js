import React, { Component } from "react";

class User extends Component {
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  googleSignIn = e => {
    e.preventDefault();
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  };

  googleSignOut = e => {
    e.preventDefault();
    this.props.firebase.auth().signOut();
  };

  render() {
    return (
      <div className="ui grid center aligned">
        <div className="three wide column">
          <div
            className="ui fluid submit green button"
            id="signIn"
            onClick={e => this.googleSignIn(e)}
          >
            Sign In
          </div>
        </div>

        <div className="four wide column">
          <h3>Current User: {this.props.user ? this.props.user.displayName : "Guest"}</h3>

        </div>

        <div className="three wide column">
          <div
            className="ui fluid submit red button"
            id="signOut"
            onClick={e => this.googleSignOut(e)}
          >
            Sign Out
          </div>
        </div>
      </div>
    );
  }
}

export default User;
