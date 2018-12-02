import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import NbaSchedule from '../leagues/nba/nbaSchedule'
import NflSchedule from '../leagues/nfl/nflSchedule'
import MlbSchedule from '../leagues/mlb/mlbSchedule'
import NhlSchedule from '../leagues/nhl/nhlSchedule'


export default class Schedule extends Component {
  render() {
    let renderOption
    if(this.props.match.params.league === 'NBA') {
      return renderOption = 
      <div>
        <Switch>
          <Route path='/NBA/team/:teamId/schedule' render={(props)=><NbaSchedule {...props} />}/>
        </Switch>
      </div>
    } else if (this.props.match.params.league === 'MLB') {
      return renderOption = 
      <div>
        <Switch>
          <Route path='/MLB/team/:teamId/schedule' render={(props)=><MlbSchedule {...props} />}/>
        </Switch>
      </div>
    } else if (this.props.match.params.league === 'NHL') {
      return renderOption = 
      <div>
        <Switch>
          <Route path='/NHL/team/:teamId/schedule' render={(props)=><NhlSchedule {...props} />}/>
        </Switch>
      </div>
    } else if(this.props.match.params.league === 'NFL') {
      return renderOption = 
      <div>
        <Switch>
          <Route path='/NFL/team/:teamId/schedule' render={(props)=><NflSchedule {...props} />}/>
        </Switch>
      </div>
    }
    return(
      {renderOption}
    )
  }
}