import React, {Component} from 'react'
import axios from 'axios'
import {Col, Row} from 'react-bootstrap'
import {Card, CardText, CardTitle} from 'reactstrap'

export default class NflPlayers extends Component {
  state = {
    nflPlayers: [],
    loading: true
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8080/NFL/team/${this.props.match.params.teamId}/players`)
    .then(({data})=>{
      this.setState({
        nflPlayers: data.players,
        loading: false 

    })
    })
  }
  render() {
    let playerList = this.state.nflPlayers.map((player, key) => <div key={key}><Col className='animated zoomIn' md={4} lg={4} sm={6}>
    <Card className='displayPlayers' body>
      <CardTitle>{player.name}</CardTitle>
      <CardText># {player.jersey}</CardText>
      <CardText>Position: {player.position}</CardText>
      <CardText>Birth: {player.birth_date}</CardText>
      <CardText>Height: {player.height}"</CardText>
      <CardText>Weight: {player.weight}lbs</CardText>

    </Card>
  </Col></div>)
    if(this.state.loading) {
      return <div>LOADING</div>
    } else {
    return(
      <div>
      <h1 className='animated zoomIn'>NFL Players</h1>
      <Row>
      {playerList}
      </Row>
      </div>
    )
    }
  }
}

