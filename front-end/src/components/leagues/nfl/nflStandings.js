import React, {Component} from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

export default class NflStandings extends Component {
  state = {
    standings: [],
    loading: true
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8080/NFL/team/${this.props.match.params.teamId}/standings`)
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
    let newAfcTeam = this.state.standings.afc.sort((a, b) => {return b.wins - a.wins})
    let newNfcTeam = this.state.standings.nfc.sort((a, b) => {return b.wins - a.wins})
    let afcTeams = newAfcTeam.map((team, key) => <tr key={key}><td>{team.market} {team.name}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.win_pct}</td><td>{team.streak.type} {team.streak.length}</td><td>{team.points_for}</td><td>{team.points_against}</td></tr> )
    let nfcTeams = newNfcTeam.map((team, key) => <tr key={key}><td>{team.market} {team.name}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.win_pct}</td><td>{team.streak.type} {team.streak.length}</td><td>{team.points_for}</td><td>{team.points_against}</td></tr> )
    return(
      <div className='container animated zoomIn'>
      <h1>NFL Standings</h1>
      <h2>AFC</h2>
      <Table responsive className='displayStandings'>
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win PCT</th>
            <th>Streak</th>
            <th>Points For</th>
            <th>Points Against</th>
          </tr>
        </thead>
        <tbody>
          {afcTeams}
        </tbody>
      </Table>
      <h2>NFC</h2>
      <Table responsive className='displayStandings'>
      <thead>
          <tr>
            <th>Team</th>
            <th>Games Played</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Streak</th>
            <th>Win PCT</th>
          </tr>
        </thead>
        <tbody>
          {nfcTeams}
        </tbody>
      </Table>      
      </div>
      )
    }
  }
}

