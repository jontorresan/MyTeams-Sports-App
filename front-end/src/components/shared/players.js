import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import NhlPlayers from '../leagues/nhl/nhlPlayers'
import NbaPlayers from '../leagues/nba/nbaPlayers'
import NflPlayers from '../leagues/nfl/nflPlayers'
import MlbPlayers from '../leagues/mlb/mlbPlayers'

export default class Players extends Component {
  render() {
    let renderOption
    if(this.props.match.params.league === 'NBA') {
      return renderOption = 
      <div>
      <Switch>
        <Route path='/NBA/team/:teamId/players' render={(props)=> <NbaPlayers {...props} />}/>
      </Switch>
      </div>
    } else if (this.props.match.params.league === 'MLB') {
      return renderOption = 
      <div>
      <Switch>
        <Route path='/MLB/team/:teamId/players' render={(props)=> <MlbPlayers {...props} />}/>
      </Switch>
      </div>
    } else if (this.props.match.params.league === 'NHL') {
      return renderOption =
      <div> 
      <Switch>
        <Route path='/NHL/team/:teamId/players' render={(props)=> <NhlPlayers {...props} />}/>
      </Switch>
      </div>
    } else if(this.props.match.params.league === 'NFL') {
      return renderOption =
      <div> 
      <Switch>
        <Route path='/NFL/team/:teamId/players' render={(props)=> <NflPlayers {...props} />}/>
      </Switch>
      </div>
    }
    
    
    return(
      {renderOption}
    )
  }
}
