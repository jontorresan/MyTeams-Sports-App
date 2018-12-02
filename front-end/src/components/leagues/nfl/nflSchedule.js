import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import Calendar from 'react-big-calendar'
import Footer from '../../shared/footer'

const localizer = Calendar.momentLocalizer(moment);

export default class NflSchedule extends Component {
  state = {
    events: [
      {
        start: new Date(),
        homeTeam: '',
        awayTeam: ''
      }
    ]
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8080/NFL/team/${this.props.match.params.teamId}/schedule`)
    .then(({data})=>{
      this.setState({
        events: data.teamGames.map(game => ({
          title: `${game.awayTeam} at ${game.homeTeam}`,
          description: `SCORE: ${game.awayTeamScore} : ${game.homeTeamScore}`,
          start: new Date(game.start),
          end: moment(new Date(game.start)).add(3, 'hours')
        }))
      })
    })
  }
  render() {
    if(this.state.events[0].homeTeam === ''){
      return <div>LOADING</div>
    } else {
    return(
      <div className='container animated zoomIn'>
      <h1>NFL Schedule</h1>
      <div>
        <Calendar
          className='displaySchedule'
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
          views={['month']}
        />
      </div>
      <Footer/>
      </div>
    )}
  }
}