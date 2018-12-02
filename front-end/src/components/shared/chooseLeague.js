import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import {Switch, Link, Route} from 'react-router-dom'
import NbaComponent from '../leagues/nba/nbaComponent'
import NflComponent from '../leagues/nfl/nflComponent'
import NhlComponent from '../leagues/nhl/nhlComponent'
import MlbComponent from '../leagues/mlb/mlbComponent'
import NavBar from './navbar'



export default class ChooseLeague extends Component {

  render() {
    return(
          
      <div>
        <NavBar history={this.props.history} logUserOut={this.props.logUserOut} />
        <h1 className='chooseLeagueHeader'>CHOOSE LEAGUE</h1>
        <div>
        <Grid>
          <Row className="show-grid">
            <Col sm={6} md={3}>
              <br />
              <Link to='/league/NBA'><img className='nbaLogo' alt='' src='/images/nbalogo.png'/></Link>
            </Col>
            <Col sm={6} md={3}>
              <br />
              <Link to='/league/MLB'><img className='mlbLogo' alt='' src='/images/mlblogo.png'/></Link>
            </Col>
            <Col sm={6} md={3}>
              <br />
              <Link to='/league/NFL'><img className='nflLogo' alt='' src='/images/NFL-Logo.png'/></Link>
            </Col>
            <Col sm={6} md={3}>
              <br />
              <Link to='/league/NHL'><img className='nhlLogo' alt='' src='/images/nhllogo.jpg'/></Link>
            </Col>
          </Row>
        </Grid>
        </div>
        <div>
          <Switch>
              <Route path='/league/NBA' render={(props) => <NbaComponent {...props}/> }/>
              <Route path='/league/MLB' render={(props) => <MlbComponent {...props}/> }/>
              <Route path='/league/NFL' render={(props) => <NflComponent {...props}/> }/>
              <Route path='/league/NHL' render={(props) => <NhlComponent {...props}/> }/>
          </Switch>
        </div>
      </div>
      
    )
  }
}