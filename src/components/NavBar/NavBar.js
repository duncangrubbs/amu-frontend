import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import APIHelper from '../../helpers/APIHelper';

class NavBar extends Component {

  constructor() {
    super();
    
    this.state = {
      isLoggedIn: false,
      search: ''
    }
  }

  search(e) {
    e.preventDefault();
    APIHelper.GET(`/api/user/query/${this.state.search}`)
      .then((data) => {
        console.log(data); // eslint-disable-line
      })
  }

  componentDidMount() {
    this.setState({ isLoggedIn: APIHelper.isLoggedIn() });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  logout() {
    APIHelper.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">AMU</Link>
        <button className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Athletes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Coaches</Link>
            </li>
            {
              this.state.isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            }
            {
              this.state.isLoggedIn &&
              <li className="nav-item">
                <Link onClick={this.logout.bind(this)} className="nav-link" to="/login">Log Out</Link>
              </li>
            }
            {
              !this.state.isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
              </li>
            }
            {
              !this.state.isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            }
            
          </ul>
        </div>
        
        <form className="form-inline">
            <input
              onChange={this.handleChange.bind(this)}
              name="search"
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search" />
            <button
              onClick={this.search.bind(this)}
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit">Search</button>
          </form>
      </nav>
    );
  }
}

export default NavBar;
