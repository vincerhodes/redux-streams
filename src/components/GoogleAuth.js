import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const clientId =
  "904587428709-aku6rhk3s0l2hqbfk00qte07up5546vd.apps.googleusercontent.com";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: clientId,
          scope: "email",
          plugin_name: "Jimmy's Streaming Service",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <div>
          <button
            className='ui green google button'
            onClick={this.onSignOutClick}
          >
            <i className='google icon' />
            Sign Out
          </button>
        </div>
      );
    } else if (!this.props.isSignedIn) {
      return (
        <button className='ui red google button' onClick={this.onSignInClick}>
          <i className='google icon' />
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

// code to get user profile (name, email)
// const profile = this.auth.currentUser.get().getBasicProfile();

// if (this.state.isSignedIn) {
//   this.setState({
//     email: profile.getEmail(),
//     name: profile.getName(),
//   });
// }
