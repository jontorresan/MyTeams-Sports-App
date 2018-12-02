import React, {Component} from 'react'
import axios from 'axios'
import {Col, Row} from 'react-bootstrap'
import {Card, CardText, CardTitle} from 'reactstrap'

export default class NhlPlayers extends Component {
  state = {
    nhlPlayers: [],
    loading: true
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8080/NHL/team/${this.props.match.params.teamId}/players`)
    .then(({data})=>{
      this.setState({
        nhlPlayers: data.players,
        loading: false 

    })
    })
  }
  render() {
    let playerList = this.state.nhlPlayers.map((player, key)=> <div key={key}><Col className='animated zoomIn' md={4} lg={4} sm={6}>
    <Card body className='displayPlayers'>
      <CardTitle>{player.full_name}</CardTitle>
      <CardText>#{player.jersey_number}</CardText>
      <CardText>Birth: {player.birthdate}</CardText>
      <CardText>Height: {player.height}"</CardText>
      <CardText>Weight: {player.weight}lbs</CardText>

    </Card>
  </Col></div>)
    if(this.state.loading) {
      return <div>LOADING</div>
    } else {
    return(
      <div >
      <h1 className='animated zoomIn'>NHL Players</h1>
      <Row>
      {playerList}
      </Row>
      </div>
    )
    }
  }
}

