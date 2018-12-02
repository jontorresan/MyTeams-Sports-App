import React, {Component} from 'react'
import axios from 'axios'
import {Col, Row} from 'react-bootstrap'
import {Card, CardText, CardTitle} from 'reactstrap'

export default class MlbPlayers extends Component {
  state = {
    mlbPlayers: [],
    loading: true
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8080/MLB/team/${this.props.match.params.teamId}/players`)
    .then(({data})=>{
      this.setState({
        mlbPlayers: data.players,
        loading: false 
      })
    })
  }
  render() {
    let playerList = this.state.mlbPlayers.map((player, key)=> <div key={key}><Col className='animated zoomIn' md={4} lg={4} sm={6}>
    <Card body className='displayPlayers'>
      <CardTitle>{player.full_name}</CardTitle>
      <CardText>#{player.jersey_number}</CardText>
      <CardText>Position: {player.primary_position}</CardText>
      <CardText>Birthdate: {player.birthdate}</CardText>
      <CardText>Height: {player.height}"</CardText>
      <CardText>Weight: {player.weight}lbs</CardText>

    </Card>
  </Col></div>)
    return(
      <div>
      <h1 className='animated zoomIn'>Players</h1>
      <Row>
      {playerList}
    </Row>
      
      </div>
    )
  }
}
