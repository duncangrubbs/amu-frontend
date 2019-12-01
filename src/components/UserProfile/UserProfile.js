import React, { Component } from 'react';
import propTypes from 'prop-types';

class UserProfile extends Component {
  render() {
    return (
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{`${this.props.firstName} ${this.props.lastName}`} - {this.props.location}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{this.props.sport} - {this.props.level}</h6>
          <p className="card-text">
          <span className="badge badge-pill badge-info">{this.props.yearsPlaying} years playing</span>
          {
            this.props.belongsToGym &&
            <span className="badge badge-pill badge-success">GYM MEMBER</span>
          }
          {
            !this.props.belongsToGym &&
            <span className="badge badge-pill badge-danger">NOT GYM MEMBER</span>
          }
          </p>
          <p className="card-text">{this.props.schedule}, {this.props.workoutPref} hour workouts</p>
        </div>
      </div>
    )
  }
}

UserProfile.propTypes = {
  firstName: propTypes.string.isRequired,
  lastName: propTypes.string.isRequired,
  sport: propTypes.string.isRequired,
  level: propTypes.string,
  location: propTypes.string.isRequired,
  age: propTypes.number.isRequired,
  schedule: propTypes.string.isRequired,
  workoutPref: propTypes.string,
  yearsPlaying: propTypes.number,
  belongsToGym: propTypes.bool,
  userID: propTypes.string.isRequired,
};

export default UserProfile;