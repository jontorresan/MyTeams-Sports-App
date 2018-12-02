import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Grid, Col} from 'react-bootstrap'
import Footer from '../../shared/footer'

export default class NflComponent extends Component {
  state = {
    afcEast: [],
    afcNorth: [],
    afcSouth: [],
    afcWest: [],
    nfcEast: [],
    nfcNorth: [],
    nfcSouth: [],
    nfcWest: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/league/NFL')
    .then(({data})=>{
      this.setState({
        afcEast: data.afcEast,
        afcNorth: data.afcNorth,
        afcSouth: data.afcSouth,
        afcWest: data.afcWest,
        nfcEast: data.nfcEast,
        nfcNorth: data.nfcNorth,
        nfcSouth: data.nfcSouth,
        nfcWest: data.nfcWest
      })
    })
  }
  render() {
    let afcEastTeams = this.state.afcEast.map((team, key) => <div key={key}><Link to={`/NFL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let afcNorthTeams = this.state.afcNorth.map((team, key) => <div key={key}><Link to={`/NFL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let afcSouthTeams = this.state.afcSouth.map((team, key) => <div key={key}><Link to={`/NFL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let afcWestTeams = this.state.afcWest.map((team, key) => <div key={key}><Link to={`/NFL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let nfcEastTeams = this.state.nfcEast.map((team, key) => <div key={key}><Link to={`/NFL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let nfcNorthTeams = this.state.nfcNorth.map((team, key) => <div key={key}><Link to={`/NFL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let nfcSouthTeams = this.state.nfcSouth.map((team, key) => <div key={key}><Link to={`/NFL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let nfcWestTeams = this.state.nfcWest.map((team, key) => <div key={key}><Link to={`/NFL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    return(
      <div className='animated zoomIn'>
      <h1 className='header'> NFL</h1>
      <br/>
      <Grid>
        <Col md={6} className='displayWest'>
        <h1 className='subHeader'>AFC</h1>
      <h3>AFC EAST</h3>
      {afcEastTeams}
      <h3>AFC NORTH</h3>
      {afcNorthTeams}
      <h3>AFC SOUTH</h3>
      {afcSouthTeams}
      <h3>AFC WEST</h3>
      {afcWestTeams} 
      <br/>
      </Col>
      <Col md={6} className='displayEast'>
      <h1 className='subHeader'>NFC</h1>
      <h3>NFC EAST</h3>
      {nfcEastTeams}
      <h3>NFC NORTH</h3>
      {nfcNorthTeams}
      <h3>NFC SOUTH</h3>
      {nfcSouthTeams}
      <h3>NFC WEST</h3>
      {nfcWestTeams}
      <br/>
      </Col>
      </Grid>
      <Footer />
      </div>
    )
  }
}