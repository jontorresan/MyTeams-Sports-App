import React, {Component} from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

export default class NhlTeamStats extends Component {
  state = {
    nhlTeamStats: {},
    loading: true
  }
  componentDidMount = () => {
    axios.get(`http://localhost:8080/NHL/team/${this.props.match.params.teamId}/teamStats`)
    .then(({data})=>{
      this.setState({
        nhlTeamStats: data,
        loading: false
      }) 
    })
  }
  render() {
    if(this.state.loading) {
      return <div>LOADING</div>
    } else {
      let newPlayer = this.state.nhlTeamStats.data.players.sort((a, b)=> {return b.statistics.total.points - a.statistics.total.points})
      let playerList = newPlayer.map((player, key) => <tr key={key}><td>{player.full_name} #{player.jersey_number}</td><td>{player.position}</td><td>{player.statistics.total.games_played}</td><td>{player.statistics.total.points}</td><td>{player.statistics.total.goals}</td><td>{player.statistics.total.assists}</td><td>{player.statistics.total.shots}</td><td>{player.statistics.total.plus_minus}</td><td>{player.statistics.total.hits}</td></tr>)
    return(
      <div className='container animated zoomIn'>
        <h1>NHL Team Stats</h1>
          <Table responsive className='displayNbaNhlStats'>
            <thead>
              <tr>
                <th>Player</th>
                <th>Position</th>
                <th>Games Played</th>
                <th>Points</th>
                <th>Total Goals</th>
                <th>Total Assists</th>
                <th>Shots</th>
                <th>+/-</th>
                <th>Hits</th>
              </tr>
            </thead>
            <tbody>
                {playerList}
            </tbody>
          </Table>;
      </div>
    )}
  }
}

