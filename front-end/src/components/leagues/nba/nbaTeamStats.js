import React, {Component} from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

export default class NbaTeamStats extends Component {
  state = {
    nbaTeamStats: {},
    loading: true
  }
  componentDidMount = () => {
    axios.get(`http://localhost:8080/NBA/team/${this.props.match.params.teamId}/teamStats`)
    .then(({data})=>{
      this.setState({
        nbaTeamStats: data,
        loading: false
      }) 
    })
  }
  render() {
    if(this.state.loading){
      return <div>LOADING</div>
    } else {
      let newPlayer = this.state.nbaTeamStats.data.players.sort((a, b)=> {return b.total.points - a.total.points})
      let playerList = newPlayer.map((player, key) => <tr key={key}><td>{player.full_name} #{player.jersey_number}</td><td>{player.position}</td><td>{player.total.points}</td><td>{player.total.assists}</td><td>{player.total.free_throws_made}/{player.total.free_throws_att} <br/> PCT: {player.total.free_throws_pct}</td><td>{player.total.field_goals_made}/{player.total.field_goals_att}<br/> PCT: {player.total.field_goals_pct}</td><td>{player.total.three_points_att}/{player.total.three_points_made} <br/> PCT: {player.total.three_points_pct}</td><td>{player.total.steals}/{player.total.blocks}</td></tr>)
    return(
      <div className='container animated zoomIn'>
      <h1>Team Stats</h1>
      <Table responsive className='displayNbaNhlStats'>
        <thead>
          <tr>
            <th>Player</th>
            <th>Position</th>
            <th>Total Points</th>
            <th>Total Assists</th>
            <th>Field Goals</th>
            <th>Free Throws</th>
            <th>3 Pointers</th>
            <th>Steals/Blocks</th>
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

