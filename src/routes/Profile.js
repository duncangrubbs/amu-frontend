import React, { Component } from 'react';
import APIHelper from '../helpers/APIHelper';

import UserProfile from '../components/UserProfile';
import Notification from '../components/Notification';
import NavBar from '../components/NavBar';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: null,
      pendingNotifications: [],
      pastNotifications: [],
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getUserNotifications();
  }

  getUserData() {
    APIHelper.GET('/api/user/')
      .then((userData) => {
        this.setState({ userData });
      })
  }

  getUserNotifications() {
    APIHelper.GET('/api/user/notifications/0/POKE')
      .then((pendingNotifications) => {
        this.setState({ pendingNotifications });
      });

    APIHelper.GET('/api/user/notifications/1/POKE')
      .then((pastNotifications) => {
        this.setState({ pastNotifications });
      });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container my-4">
          <h2>Profile</h2>
          {
            this.state.userData !== null &&
            <UserProfile
              firstName={this.state.userData.name.first}
              lastName={this.state.userData.name.last}
              sport={this.state.userData.primarySport}
              level={this.state.userData.survey.levelOfCompetition}
              yearsPlaying={this.state.userData.survey.yearsPlaying}
              schedule="TH 2-5PM"
              age={this.state.userData.age}
              location={this.state.userData.city}
              workoutPref={this.state.userData.survey.workoutLength}
              userID={this.state.userData.id}
              key={this.state.userData.id}
            />
          }
          <h3>Pending Requests</h3>
          {
            this.state.pendingNotifications.map((notif) => (
              <Notification
                key={notif._id}
                id={notif._id}
                userID={notif.id}
                status={notif.status}
                type={notif.type}
                message={notif.message}
                date={notif.date}
              />
            ))
          }
          <h4>Past Workouts</h4>
          {
            this.state.pastNotifications.map((notif) => (
              <Notification
                key={notif._id}
                id={notif._id}
                userID={notif.id}
                status={notif.status}
                type={notif.type}
                message={notif.message}
                date={notif.date}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default Profile;