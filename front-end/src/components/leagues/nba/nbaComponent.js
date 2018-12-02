import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Grid, Col} from 'react-bootstrap'
import Footer from '../../shared/footer'

export default class NbaComponent extends Component {
  state = {
    divSouthEast: [],
    divAtlantic: [],
    divCentral: [],
    divNorthWest: [],
    divSouthWest: [],
    divPacific: []
  }
  componentDidMount = () => {
    axios.get('http://localhost:8080/league/NBA')
    .then(({data})=>{
      this.setState({
        divSouthEast: data.divSouthEast,
        divAtlantic: data.divAtlantic,
        divCentral: data.divCentral,
        divNorthWest: data.divNorthWest,
        divSouthWest: data.divSouthWest,
        divPacific: data.divPacific
      })
    })
  }
  render() {
    let divSouthEastTeams = this.state.divSouthEast.map((team, key)=> <div key={key}><Link to={`/NBA/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let divAtlanticTeams = this.state.divAtlantic.map((team, key)=> <div key={key}><Link to={`/NBA/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let divCentralTeams = this.state.divCentral.map((team, key)=> <div key={key}><Link to={`/NBA/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let divNorthWestTeams = this.state.divNorthWest.map((team, key)=> <div key={key}><Link to={`/NBA/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let divSouthWestTeams = this.state.divSouthWest.map((team, key)=> <div key={key}><Link to={`/NBA/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let divPacificTeams = this.state.divPacific.map((team, key)=> <div key={key}><Link to={`/NBA/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    return(
      <div className='animated zoomIn'>      
      <h1 className='header'>NBA</h1>
      <br/>
      <Grid>
        <Col md={6} className='displayWest'>
        <h1 className='subHeader'>West</h1>
      <h3>NorthWest Division</h3>
      {divNorthWestTeams}
      <h3>SouthWest Division</h3>
      {divSouthWestTeams}
      <h3>Pacific Division</h3>
      {divPacificTeams}
      <br/>
      </Col>
      <Col md={6} className='displayEast'>
      <h1 className='subHeader'>East</h1>
      <h3>South East Division</h3>
      {divSouthEastTeams}
      <h3>Atlantic Division</h3>
      {divAtlanticTeams}
      <h3>Central Division</h3>
      {divCentralTeams}
      <br/>
      </Col>
      </Grid>
      <Footer />
      </div>
      
    )
  }
}

