import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import APIHelper from '../helpers/APIHelper';

import NavBar from '../components/NavBar';
import Error from '../components/Error';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      redirect: false,
      error: null,
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

    APIHelper.POST('/api/auth/login', { user })
      .then((user) => {
        APIHelper.saveToken(user.token);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        this.setState({ error });
      })
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/" /> }
    return (
      <div>
        <NavBar />
        <div className="container my-4">
          <h2>Login</h2>
          <Error content={this.state.error} />
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