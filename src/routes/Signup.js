import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import APIHelper from '../helpers/APIHelper';
import Error from '../components/Error';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: String,
      lastName: String,
      username: String,
      email: String,
      password: String,
      confirmPassword: String,
      age: Number,
      gender: 'Male',
      primarySport: 'Basketball',
      availibility: [],
      lineOne: String,
      lineTwo: String,
      city: String,
      state: 'California',
      zip: Number,
      gym: 'YES',
      length: String,
      years: Number,
      level: 'NCAA DIII',
      redirect: false,
      error: null,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.signup();
    }
  }

  selectChange(evt) {
    const index = evt.target.selectedIndex;
    this.setState({ [evt.target.id]: evt.target[index].value });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  signup() {
    const belongsToGym = this.state.gym === 'YES' ? true : false;
    const user = {
      name: {
        first: this.state.firstName,
        last: this.state.lastName,
      },
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
      gender: this.state.gender,
      primarySport: this.state.primarySport,
      availibility: this.state.availibility,
      survey: {
        levelOfCompetition: this.state.level,
        belongsToGym,
        yearsPlaying: this.state.years,
        workoutLength: this.state.length,
      },
      mailingAddress: {
        line_one: this.state.lineOne,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }
    };

    APIHelper.POST('/api/auth/signup', { user })
      .then(() => {
        this.setState({ redirect: true })
      })
      .catch((error) => {
        this.setState({ error });
      })
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/login" /> }
    return (
      <div>
        <NavBar />
        <div className="container my-4">
          <h2>Signup</h2>
          <Error content={this.state.error} />
          <h4>Personal Info</h4>
          <div className="row">
            <div className="col-sm">
              <input
                name="firstName"
                className="form-control my-2"
                onChange={this.handleChange.bind(this)}
                placeholder="First Name"
                required />
            </div>
            <div className="col-sm">
              <input
                name="lastName"
                className="form-control my-2"
                onChange={this.handleChange.bind(this)}
                placeholder="Last Name"
                required />
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              <input
                name="email"
                type="email"
                className="form-control my-2"
                onChange={this.handleChange.bind(this)}
                placeholder="Email"
                required />
            </div>
              
            <div className="col-sm">
              <input
                name="username"
                className="form-control my-2"
                onChange={this.handleChange.bind(this)}
                placeholder="Username"
                required />
            </div>
          </div>

          {/* Personal Info */}
          <select
            defaultValue="Male"
            onChange={this.selectChange.bind(this)}
            className="form-control my-2"
            id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            name="age"
            type="number"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            placeholder="Age"
            required />
          <select
            defaultValue=""
            onChange={this.selectChange.bind(this)}
            className="form-control my-2"
            id="primarySport">
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
            <option value="Soccer">Soccer</option>
            <option value="Football">Football</option>
            <option value="Tennis">Tennis</option>
            <option value="Golf">Golf</option>
            <option value="Ultimate Frisbee">Ultimate Frisbee</option>
          </select>

          {/* Address */}
          <h4>Address</h4>
          <input
            name="lineOne"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            placeholder="Address Line One"
            required />
          <input
            name="lineTwo"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            placeholder="Address Line Two"
            required />
          <input
            name="city"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            placeholder="City"
            required />
          <select
            defaultValue="California"
            onChange={this.selectChange.bind(this)}
            className="form-control my-2"
            id="state">
            <option value="California">California</option>
            <option value="New York">New York</option>
            <option value="Ohio">Ohio</option>
            <option value="Alaska">Alaska</option>
            <option value="Alabama">Alabama</option>
            <option value="Nevada">Nevada</option>
          </select>
          <input
            name="zip"
            type="number"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            placeholder="Zip Code"
            required />

          {/* Survey */}
          <h4>Short Survey</h4>
          <label htmlFor="level">Highest Level of Competition</label>
          <select
            defaultValue="NCAA DIII"
            onChange={this.selectChange.bind(this)}
            className="form-control my-2"
            id="level">
            <option value="Professional">Professional</option>
            <option value="NCAA DI">NCAA DI</option>
            <option value="NCAA DII">NCAA DII</option>
            <option value="NCAA DIII">NCAA DIII</option>
            <option value="NCAA DIII">Club</option>
            <option value="High School Varsity">High School Varsity</option>
            <option value="Recreational">Recreational</option>
            <option value="None">None</option>
          </select>

          <label htmlFor="level">Do you belong to a gym?</label>
          <select
            defaultValue="Yes"
            onChange={this.selectChange.bind(this)}
            className="form-control my-2"
            id="gym">
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>

          <label htmlFor="year">Years working out?</label>
          <input
            name="years"
            id="years"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            type="number"
            placeholder="0"
          />

          <label htmlFor="length">Preferred workout length (e.g. 1-2)</label>
          <input
            name="length"
            id="length"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            placeholder="1-2"
          />

          {/* Password */}
          <h4>Password</h4>
          <input
            name="password"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            type="password"
            placeholder="Password"
            required />
          <input
            name="confirmPassword"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            type="password"
            placeholder="Confirm Password"
            required />
          <button
            onClick={this.signup.bind(this)}
            className="btn btn-primary">
            Signup</button>
        </div>
      </div>
    )
  }
}

export default Signup;