import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import MyTeams from './components/shared/myTeams'
import LoginPage from './components/shared/loginPage'
import ChooseLeague from './components/shared/chooseLeague'
import TeamPage from './components/shared/teampage'

import './App.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css' 
import axios from 'axios'


class App extends Component {
  state = {
    activeUser: {},
    userEmail: '',
    teamExists: false,
    loading: true
  }

  componentDidMount = () => {
    this.getUserSession()
  }

  getUserSession = (e) => {
    axios.get("http://localhost:8080/activeuser")
    .then((res)=>{
      this.setState({
        activeUser: res.data, 
        loading: false
      })
    })
  }

  addToMyTeams = (team) => {
    let user = this.state.activeUser
    let ifTrue = user.user.myTeams.some((myTeam) => {
      return myTeam.name === team.name
    })
    if(ifTrue) {
      this.setState({
        teamExists: true
      })
    } else {
      user.user.myTeams = user.user.myTeams.concat(team)
      this.setState({
        activeUser: user
      }, ()=> {
        axios.put('http://localhost:8080/activeuser', {user: this.state.activeUser})
      })
    }
  }

  getUser = (e) => {
    this.setState({
      userEmail: e.target.value
    })
  }

  logUserIn = (e, func) => {
    axios.post('http://localhost:8080/activeuser', {email: this.state.userEmail})
    .then(({data}) => {
      if(data.errors){
        console.log(data.errors)
      }else{
      this.setState({
        activeUser: data
      })
      func()
    }
    })
  }

  logUserOut = () => {
    this.setState({
      activeUser: {}, 
      userEmail: ''
    }, () => {
      axios.post('http://localhost:8080/activeuser', {email: null})
      
    })
  }

  render() {
    return (
      <div className='App'>
      {this.state.loading ?"Loading...": (
        <Switch>
        <Route path='/' exact render={(props)=> <LoginPage {...props} getUser={this.getUser} logUserIn={this.logUserIn}/>}/>
        <Route path='/league' render={(props)=> <ChooseLeague {...props} logUserOut={this.logUserOut}/>}/>
        <Route path='/:league/team/:teamId' render={(props)=> <TeamPage teamExists={this.state.teamExists} addToMyTeams={this.addToMyTeams} logUserOut={this.logUserOut} {...props}/>} />
        <Route path='/myTeams' render={(props)=> <MyTeams activeUser={this.state.activeUser} logUserOut={this.logUserOut} {...props}/>} />
      </Switch>
      )}
      </div>
    );
  }
}

export default App;


