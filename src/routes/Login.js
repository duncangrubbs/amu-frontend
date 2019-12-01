import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import APIHelper from '../helpers/APIHelper';

import NavBar from '../components/NavBar';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
  }

  componentDidMount() {
    APIHelper.isLoggedIn();
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  login() {
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })
      .then(res => res.json())
      .then((data) => {
        APIHelper.saveToken(data.user.token);
        this.setState({ redirect: true });
      });
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/" /> }
    return (
      <div>
        <NavBar />
        <div className="container my-4">
          <h2>Login</h2>
          <input
            name="username"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            placeholder="Username"
            required />
          <input
            name="password"
            className="form-control my-2"
            onChange={this.handleChange.bind(this)}
            type="password"
            placeholder="Password"
            required />
          <button
            onClick={this.login.bind(this)}
            className="btn btn-primary">
            Login</button>
        </div>
      </div>
    )
  }
}

export default Login;