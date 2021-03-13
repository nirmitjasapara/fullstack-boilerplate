import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App/App.css'
import './Header.css'
import TokenService from '../../services/token-service';

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <div className='log-out'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'
          className='nav-button'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='log-in'>
        <Link
          to='/register'
          className='nav-button'>
          Register
        </Link>
        <span className='Hyph'>{' - '}</span>
        <Link
          to='/login'
          className='nav-button'>
          Log in
        </Link>
      </div>
    )
  }

  render() {
    return (
      <header className='Header'>
        <h1>
          <Link to='/'>
            Boilerplate
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    )
  }
}