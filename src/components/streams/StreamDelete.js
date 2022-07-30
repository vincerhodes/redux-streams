import React from "react";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";
import { Component } from "react";

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderActions() {
    return (
      <>
        <Link onClick={this.onDelete} className='ui button negative' to={"/"}>
          Delete
        </Link>
        <Link className='ui button' to={"/"}>
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Please confirm you wish to delete stream ...";
    }

    return `Please confirm you wish to delete stream: ${this.props.stream.title}`;
  }

  render() {
    return (
      <>
        <Modal
          header='Confirm delete stream'
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
