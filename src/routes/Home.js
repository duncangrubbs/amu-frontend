import React, { Component } from 'react';
import APIHelper from '../helpers/APIHelper';

import User from '../components/User';
import NavBar from '../components/NavBar';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    APIHelper.GET('/api/user/all')
      .then((users) => {
        this.setState({ users })
      });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container my-4">
          <h2>Home</h2>
          {this.state.users.map(user => (
            <User
              firstName={user.name.first}
              lastName={user.name.last}
              sport={user.primarySport}
              level={user.survey.levelOfCompetition}
              schedule="MWF 3-8PM"
              age={user.age}
              location={user.city}
              yearsPlaying={user.survey.yearsPlaying}
              belongsToGym={user.survey.belongsToGym}
              workoutPref={user.survey.workoutLength}
              userID={user.id}
              key={user.id}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Home;