import React, {Component} from 'react'
import axios from 'axios'
import {Grid, Row, Col} from 'react-bootstrap'

export default class NflTeamStats extends Component {
  state = {
  nflTeamStats: {},
  loading: true
  }
  componentDidMount = () => {
    axios.get(`http://localhost:8080/NFL/team/${this.props.match.params.teamId}/teamStats`)
    .then(({data})=>{
      this.setState({
        nflTeamStats: data,
        loading: false
      }) 
    })
  }
  render() {
    if(this.state.loading) {
      return <div>LOADING</div>
    } else {
    return(
      <div className='animated zoomIn'>
      <h1>NFL Team Stats</h1>
      <Grid>
        <Row>
      <Col md={6} className='displayMlbNflStats'>
        <h2>Offense</h2>
        <h4>Touchdowns</h4>
        <p>Total: {this.state.nflTeamStats.data.record.touchdowns.total}</p>
        <p>Rush: {this.state.nflTeamStats.data.record.touchdowns.rush}</p>
        <p>Pass: {this.state.nflTeamStats.data.record.touchdowns.pass}</p>
        <br/>
        <h4>Field Goals</h4>
        <p>Total: {this.state.nflTeamStats.data.record.field_goals.made}/{this.state.nflTeamStats.data.record.field_goals.attempts}</p>
        <p>Longest: {this.state.nflTeamStats.data.record.field_goals.longest}</p>
        <p>Average: {this.state.nflTeamStats.data.record.field_goals.average_yards}</p>
        <br/>
        <h4>Interceptions/Fumbles</h4>
        <p>{this.state.nflTeamStats.data.record.passing.interceptions}/{this.state.nflTeamStats.data.record.fumbles.fumbles}</p>
       
        
      </Col>
      <Col md={6} className='displayMlbNflStats'>
      <h2>Defense</h2>
      <h4>Tackles</h4>
      <p>{this.state.nflTeamStats.data.record.defense.tackles}</p>
      <br/>
      <h4>Sacks</h4>
      <p>{this.state.nflTeamStats.data.record.defense.sacks}</p>
      <br/>
      <h4>Interceptions</h4>
      <p>{this.state.nflTeamStats.data.record.defense.interceptions}</p>
      <br/>
      <h4>Fumbles</h4>
      <p>Forced Fumbles: {this.state.nflTeamStats.data.record.defense.forced_fumbles}</p>
      <p>Recovered Fumbles: {this.state.nflTeamStats.data.record.defense.fumble_recoveries}</p>
      </Col>
      </Row>
      </Grid>
      
      </div>
    )}
  }
}

