import React, {Component} from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'


export default class MlbStandings extends Component {
  state = {
    standings: [],
    loading: true
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8080/MLB/team/${this.props.match.params.teamId}/standings`)
    .then(({data}) => {
      this.setState({
        standings: data,
        loading: false
      })
    })
  }
  render() {
    if(this.state.loading) {
      return <div>LOADING</div>
    } else {
      let newAlTeam = this.state.standings.al.sort((a, b)=> {return b.win - a.win})
      let newNlTeam = this.state.standings.nl.sort((a, b)=> {return b.win - a.win})
      let alTeams = newAlTeam.map((team, key)=> <tr key={key}><td>{team.market} {team.name}</td><td>{team.win}</td><td>{team.loss}</td><td>{team.streak}</td><td>{team.win_p}</td></tr>)
      let nlTeams = newNlTeam.map((team, key)=> <tr key={key}><td>{team.market} {team.name}</td><td>{team.win}</td><td>{team.loss}</td><td>{team.streak}</td><td>{team.win_p}</td></tr>)
      return(
        <div className='container animated zoomIn'>
      <h1>MLB Standings</h1>
      <h2>American League</h2>
      <Table responsive className='displayStandings'>
      <thead>
    <tr>
      <th>Team</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>Streak</th>
      <th>Win PCT</th>
    </tr>
    </thead>
  <tbody>
    {alTeams}
    </tbody>
    </Table>
    <h2>National League</h2>
    <Table responsive className='displayStandings'>
    <thead>
    <tr>
      <th>Team</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>Streak</th>
      <th>Win PCT</th>
    </tr>
    </thead>
  <tbody>
    {nlTeams}
    </tbody>
    </Table>
    </div>
        )
      }
  
  }
}
