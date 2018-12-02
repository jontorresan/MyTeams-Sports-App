import React, {Component} from 'react'
import axios from 'axios'
import NavBar from './navbar'
import {Grid, Row, Col} from 'react-bootstrap'
import {Link, Switch, Route} from 'react-router-dom'
import TeamStats from './teamStats'
import Schedule from './schedule'
import Players from './players'
import Standings from './standings'

export default class TeamPage extends Component {
  state = {
    team: {}
  }
   
  componentDidMount = () => {
    axios.get(`http://localhost:8080/${this.props.match.params.league}/team/${this.props.match.params.teamId}`)
    .then(({data}) => {
      this.setState({
        team: data.teamInfo
      })
    })
  }

  render() {
    let savedMessage = this.props.teamExists ? <p></p> : ""
    return(
      <div>
        <NavBar history={this.props.history} logUserOut={this.props.logUserOut}/>
        <h1>{this.state.team.name} Team Page</h1>
   
        <Grid>
          <Row className="show-grid">
            <Col sm={6} md={3}>
              <br />
              <Link to={`/${this.props.match.params.league}/team/${this.state.team.id}/teamStats`}> STATS</Link>
            </Col>
            <Col sm={6} md={3}>
              <br />
              <Link to={`/${this.props.match.params.league}/team/${this.state.team.id}/standings`}> STANDINGS</Link>
            </Col>
            <Col sm={6} md={3}>
              <br />
              <Link to={`/${this.props.match.params.league}/team/${this.state.team.id}/schedule`}> SCHEDULE</Link>
            </Col>
            <Col sm={6} md={3}>
              <br />
              <Link to={`/${this.props.match.params.league}/team/${this.state.team.id}/players`}> PLAYERS</Link>
            </Col>
          </Row>
        </Grid>
        <button onClick={()=> this.props.addToMyTeams(this.state.team)} ><i className="far fa-star"/></button>
        {savedMessage}
        <Switch>
          <Route path='/:league/team/:teamId/teamStats' render={(props)=> <TeamStats {...props} />}/>
          <Route path='/:league/team/:teamId/standings' render={(props)=> <Standings {...props} />}/>
          <Route path='/:league/team/:teamId/schedule' render={(props)=> <Schedule {...props}/>}/>
          <Route path='/:league/team/:teamId/players' render={(props)=> <Players {...props} />}/>
        </Switch>
      </div>

    )
  }
}