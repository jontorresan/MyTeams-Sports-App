import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import MlbStandings from '../leagues/mlb/mlbStandings'
import NhlStandings from '../leagues/nhl/nhlStandings'
import NflStandings from '../leagues/nfl/nflStandings'
import NbaStandings from '../leagues/nba/nbaStandings'

export default class Standings extends Component {
  render() {
    let renderOption
    if(this.props.match.params.league === 'NBA') {
      return renderOption = 
      <div>
        <Switch>
          <Route path='/NBA/team/:teamId/standings' render={(props)=><NbaStandings {...props} />}/>
        </Switch>
      </div>
    } else if (this.props.match.params.league === 'MLB') {
      return renderOption = 
      <div>
        <Switch>
          <Route path='/MLB/team/:teamId/standings' render={(props)=><MlbStandings {...props} />}/>
        </Switch>
      </div>
    } else if (this.props.match.params.league === 'NHL') {
      return renderOption = 
      <div>
        <Switch>
          <Route path='/NHL/team/:teamId/standings' render={(props)=><NhlStandings {...props} />}/>
        </Switch>
      </div>
    } else if(this.props.match.params.league === 'NFL') {
      return renderOption = 
      <div>
        <Switch>
          <Route path='/NFL/team/:teamId/standings' render={(props)=><NflStandings {...props} />}/>
        </Switch>
      </div>
    }
    return(
      {renderOption}
    )
  }
}

