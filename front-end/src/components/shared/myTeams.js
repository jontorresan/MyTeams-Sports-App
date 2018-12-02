import React, {Component} from 'react'
import {Grid, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import NavBar from './navbar'

export default class MyTeams extends Component {
  render() {
    // console.log(this.props.activeUser.user.myTeams)
      let myTeamsArray = this.props.activeUser.user.myTeams.map((myTeam, key) => {
        if (myTeam.league) {
          if (myTeam.league.name === 'American League' || myTeam.league.name === 'National League') {
            return <div key={key}><Link to={`/MLB/team/${myTeam.id}`}>{myTeam.market} {myTeam.name}</Link></div>
          } else {
            return  <div key={key}><Link to={`/${myTeam.league.name}/team/${myTeam.id}`}>{myTeam.market} {myTeam.name}</Link></div> 
        }
      } else {
        if (myTeam.conference.name === 'NFC' || myTeam.conference.name === 'AFC') {
          return <div key={key}><Link to={`/NFL/team/${myTeam.id}`}>{myTeam.market} {myTeam.name}</Link></div>
      }
    }
    return null
  })
      return(
        <div>
          <NavBar history={this.props.history} logUserOut={this.props.logUserOut}/>
        <h1>MY TEAMS</h1>
        <Grid>
          <Row>
            <Col className='displayMyTeams'>
            {myTeamsArray}
            </Col>
          </Row>
        </Grid>
        
        </div>
      )
    }
}