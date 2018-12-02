import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import MlbTeamStats from '../leagues/mlb/mlbTeamStats'
import NbaTeamStats from '../leagues/nba/nbaTeamStats'
import NhlTeamStats from '../leagues/nhl/nhlTeamStats'
import NflTeamStats from '../leagues/nfl/nflTeamStats'

export default class TeamStats extends Component {
  render() {
    let renderOption
    if(this.props.match.params.league === 'NBA') {
      renderOption = 
      <div>
        <Switch>
          <Route path='/NBA/team/:teamId/teamStats' render={(props)=> <NbaTeamStats {...props}/>}/>
        </Switch>
      </div>
      return renderOption 
    } else if (this.props.match.params.league === 'MLB') {
      renderOption = 
      <div>
        <Switch>
          <Route path='/MLB/team/:teamId/teamStats' render={(props)=> <MlbTeamStats {...props}/>}/>
        </Switch>
      </div>
      return renderOption 
    } else if (this.props.match.params.league === 'NHL') {
      renderOption =
      <div>
        <Switch>
          <Route path='/NHL/team/:teamId/teamStats' render={(props)=> <NhlTeamStats {...props}/>}/>
        </Switch>
      </div>
      return renderOption
    } else if(this.props.match.params.league === 'NFL') {
      renderOption = 
      <div>
        <Switch>
          <Route path='/NFL/team/:teamId/teamStats' render={(props)=> <NflTeamStats {...props}/>}/>
        </Switch>
      </div>
      return renderOption 
    }

    return(
      <div>
      {renderOption}
      </div>
    )
  }
}
