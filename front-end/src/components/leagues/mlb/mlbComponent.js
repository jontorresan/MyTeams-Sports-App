import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Grid, Col} from 'react-bootstrap'
import Footer from '../../shared/footer'

export default class MlbComponent extends Component {
  state = {
    alEast: [],
    alCentral: [],
    alWest: [],
    nlEast: [],
    nlCentral: [],
    nlWest: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/league/MLB')
    .then(({data}) => {
      this.setState({
        alEast: data.alEast,
        alCentral: data.alCentral,
        alWest: data.alWest,
        nlEast: data.nlEast,
        nlCentral: data.nlCentral,
        nlWest: data.nlWest
      })
    })
  }
  render() {
    let alEastTeams = this.state.alEast.map((team, key)=> <div key={key}><Link to={`/MLB/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let alCentralTeams = this.state.alCentral.map((team, key)=> <div key={key}><Link to={`/MLB/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let alWestTeams = this.state.alWest.map((team, key)=> <div key={key}><Link to={`/MLB/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let nlEastTeams = this.state.nlEast.map((team, key)=> <div key={key}><Link to={`/MLB/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let nlCentralTeams = this.state.nlCentral.map((team, key)=> <div key={key}><Link to={`/MLB/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let nlWestTeams = this.state.nlWest.map((team, key)=> <div key={key}><Link to={`/MLB/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    return(
      <div className='animated zoomIn'>
      <h1 className='header'>MLB</h1>
      <br/>
      <Grid>
        <Col md={6} className='displayWest'>
        <h1 className='subHeader'>American League</h1>
      <h3>AL East</h3>
      {alEastTeams}
      <h3>AL Central</h3>
      {alCentralTeams}
      <h3>AL West</h3>
      {alWestTeams}
      <br/>
      </Col>
      <Col md={6} className='displayEast'>
      <h1 className='subHeader'>National League</h1>
      <h3>NL East</h3>
      {nlEastTeams}
      <h3>NL Central</h3>
      {nlCentralTeams}
      <h3>NL West</h3>
      {nlWestTeams}
      <br/>
      </Col>
      </Grid>
      <Footer />
      </div>
    )
  }
}

