import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Grid, Col} from 'react-bootstrap'
import Footer from '../../shared/footer'

export default class NhlComponent extends Component {
  state = {
    pacific: [],
    central: [],
    atlantic: [],
    met: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/league/NHL')
    .then(({data})=>{
      this.setState({
        pacific: data.divPacific,
        central: data.divCentral,
        atlantic: data.divAtlantic,
        met: data.divMet
      })
    })
  }
  render() {
    let pacificTeams = this.state.pacific.map((team, key)=> <div key={key}><Link to={`/NHL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let centralTeams = this.state.central.map((team, key)=> <div key={key}><Link to={`/NHL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let atlanticTeams = this.state.atlantic.map((team, key)=> <div key={key}><Link to={`/NHL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    let metTeams = this.state.met.map((team, key)=> <div key={key}><Link to={`/NHL/team/${team.id}`}>{team.market} {team.name}</Link></div>)
    return(
      <div className='animated zoomIn'>
      <h1 className='header'>NHL</h1>
      <br/>
      <Grid>
        <Col md={6} className='displayWest'>
        <h1 className='subHeader'>West</h1>
      <h3>Pacific Division</h3>
      {pacificTeams}
      <h3>Central Division</h3>
      {centralTeams}
      <br/>
      <br/>
      </Col>
      <Col md={6} className='displayEast'>
      <h1 className='subHeader'>East</h1>
      <h3>Atlantic Division</h3>
      {atlanticTeams}
      <h3>Metropolitan Division</h3>
      {metTeams}
      <br/>
      </Col>
      </Grid>
      <Footer />
      </div>
    )
  }
}

