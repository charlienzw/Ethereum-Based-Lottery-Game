import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import { LoginButtonContainer } from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
import { Navbar, Nav } from 'react-bootstrap';
// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './App.css'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <Nav>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile" className="pure-menu-link">Profile</Link>
          </li>
          <li>
            <Link to="/explorecontracts" className="pure-menu-link">Explore</Link>
          </li>
          <LogoutButtonContainer />
        </ul>
      </Nav>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <Nav>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/signup" className="pure-menu-link">Sign Up</Link>
          </li>
          <LoginButtonContainer />
        </ul>
      </Nav>
    )

    return (
      <div className="App">
        <div className="container">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">EthLottery</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <OnlyGuestLinks />
              <OnlyAuthLinks />
            </Navbar.Collapse>
          </Navbar>
        </div>
        {this.props.children}

      </div>
    );
  }
}

export default App
