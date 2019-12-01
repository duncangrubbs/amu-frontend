import React, { Component } from 'react';
import propTypes from 'prop-types';

import moment from 'moment';
import APIHelper from '../../helpers/APIHelper';

class Notification extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    APIHelper.GET(`/api/user/specificUser/${this.props.userID}`)
      .then((data) => {
        this.setState({ name: `${data.name.first} ${data.name.last}`})
      })
  }

  render() {
    return (
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{this.props.message}</h5>
          {
            this.props.status !== 0 &&
            <p>Connected with {this.state.name}</p>
          }
          {
            this.props.status === 0 &&
            <div>
              <p>{this.state.name} wants to connect</p>
              <button className="btn btn-primary">Accept</button>
            </div>
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