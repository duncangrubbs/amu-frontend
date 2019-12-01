import React, { Component } from 'react';
import propTypes from 'prop-types';

class Error extends Component {
  render() {
    return (
      <div>
      {
        this.props.content !== null &&
        <div className="alert alert-danger" role="alert">
          {this.props.content}
        </div>
      }
      </div>
    )
  }
}

Error.propTypes = {
  content: propTypes.string
};

export default Error;

