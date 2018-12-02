import React, {Component} from 'react'
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
  logOut = (e) => {
    
    e.preventDefault()
    this.props.logUserOut()
    this.props.history.push('/')
  }


  render() {
    return(
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem componentClass='span' >
              <Link to='/myTeams'>myTeams</Link>
            </NavItem>
            <NavItem componentClass='span'>
              <Link to='/league'>findTeam</Link>
            </NavItem>            
          </Nav>
          <Nav pullRight>
            <NavItem onClick={this.logOut} eventKey={1} href='#'>
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
