import React, { Component } from 'react';
import propTypes from 'prop-types';

import moment from 'moment';

class Notification extends Component {
  render() {
    return (
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{this.props.message}</h5>
          <p>{this.props.userID} wants to connect</p>
          {
            this.props.status === 0 &&
            <button className="btn btn-primary">Accept</button>
          }
          <p className="card-text"><small className="text-muted">{moment.unix(this.props.date / 1000).fromNow()}</small></p>
        </div>
      </div>
    )
  }
}

Notification.propTypes = {
  id: propTypes.string.isRequired,
  userID: propTypes.string.isRequired,
  status: propTypes.number.isRequired,
  type: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  date: propTypes.number.isRequired,
};

export default Notification;