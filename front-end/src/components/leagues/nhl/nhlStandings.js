import React, {Component} from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

export default class NhlStandings extends Component {
  state = {
    standings: [],
    loading: true
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8080/NHL/team/${this.props.match.params.teamId}/standings`)
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
      let newWestTeam = this.state.standings.west.sort((a, b)=> {return b.wins - a.wins})
      let newEastTeam = this.state.standings.east.sort((a, b)=> {return b.wins - a.wins})
      let eastTeams = newEastTeam.map((team, key) => <tr key={key}><td>{team.market} {team.name}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.streak.kind} {team.streak.length}</td><td>{team.win_pct}</td></tr>)
      let westTeams = newWestTeam.map((team, key) => <tr key={key}><td>{team.market} {team.name}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.streak.kind} {team.streak.length}</td><td>{team.win_pct}</td></tr>)
    return(
      <div className='container animated zoomIn'>
      <h1>NHL Standings</h1>
      <h2>West</h2>
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
          {westTeams}
          </tbody>
          </Table>
          <h2>East</h2> 
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
              {eastTeams}
            </tbody>
          </Table>
            </div>
          )
          }
        }
      }

