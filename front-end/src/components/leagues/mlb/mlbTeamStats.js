import React, {Component} from 'react'
import axios from 'axios'
import {Grid, Row, Col} from 'react-bootstrap'


export default class MlbTeamStats extends Component {
  state = {
    mlbTeamStats: {},
    loading: true
  }
  componentDidMount = () => {
    axios.get(`http://localhost:8080/MLB/team/${this.props.match.params.teamId}/teamStats`)
    .then(({data})=>{
      this.setState({
        mlbTeamStats: data,
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
      <h1>MLB Team Stats</h1>
      <Grid>
        <Row>
          
          <Col md={6}  className='displayMlbNflStats'>
            <h2 className='subHeader'>Hitting</h2>
            <p>Batting PCT: {this.state.mlbTeamStats.data.statistics.hitting.overall.avg}</p>
            <p>RBI's: {this.state.mlbTeamStats.data.statistics.hitting.overall.rbi}</p>
            <p>Total runs: {this.state.mlbTeamStats.data.statistics.hitting.overall.runs.total}</p>
            <p>Singles: {this.state.mlbTeamStats.data.statistics.hitting.overall.onbase.s}</p>
            <p>Doubles: {this.state.mlbTeamStats.data.statistics.hitting.overall.onbase.d}</p>
            <p>Triples: {this.state.mlbTeamStats.data.statistics.hitting.overall.onbase.t}</p>
            <p>Homeruns: {this.state.mlbTeamStats.data.statistics.hitting.overall.onbase.hr}</p>
            <p>Ground Ball's: {this.state.mlbTeamStats.data.statistics.hitting.overall.groundball}</p>
            <p>Fly Ball's: {this.state.mlbTeamStats.data.statistics.hitting.overall.flyball}</p>
            <p>Line Drive's: {this.state.mlbTeamStats.data.statistics.hitting.overall.linedrive}</p>
          </Col>
          <Col md={6} className='displayMlbNflStats'>
            <h2 className='subHeader'>Pitching</h2>
            <p>Total Pitches: {this.state.mlbTeamStats.data.statistics.pitching.overall.pitches.count}</p>
            <p>Total Strikes: {this.state.mlbTeamStats.data.statistics.pitching.overall.pitches.ktotal}</p>
            <p>Total Balls: {this.state.mlbTeamStats.data.statistics.pitching.overall.pitches.btotal}</p>
            <p>Total runs Against: {this.state.mlbTeamStats.data.statistics.hitting.overall.runs.total}</p>
            <p>Singles Against: {this.state.mlbTeamStats.data.statistics.pitching.overall.onbase.s}</p>
            <p>Doubles Against: {this.state.mlbTeamStats.data.statistics.pitching.overall.onbase.d}</p>
            <p>Triples Against: {this.state.mlbTeamStats.data.statistics.pitching.overall.onbase.t}</p>
            <p>Homeruns Against: {this.state.mlbTeamStats.data.statistics.pitching.overall.onbase.hr}</p>
            <p>Dirtballs: {this.state.mlbTeamStats.data.statistics.pitching.overall.outcome.dirtball}</p>
            <p>Foul Balls: {this.state.mlbTeamStats.data.statistics.pitching.overall.outcome.foul}</p>
          </Col>
        </Row>
      </Grid> 
      </div>
    )
    }
  }
}
