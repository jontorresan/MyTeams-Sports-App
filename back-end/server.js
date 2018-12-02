const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const User = require('./DB/models/users')
const bodyParser = require('body-parser')
dbConnection = require('./DB')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var loggedInUser = ""
const apiNhl = '5bjqzr55w8w23s7tbhxqtmuz'
const apiNba = 's266me4twb35x3hbmdaww2ps'
const apiNfl = 'en574j8g5ubzcmngajxye25z'
const apiMlb = 'e3jnm83des4smz6fb4djet7s'

app.put('/activeuser' , (req, res) => {
  const { user } = req.body
  console.log('email', user.user.myTeams)
  User.findOneAndUpdate({email: user.user.email}, { myTeams: user.user.myTeams}, {new: true}, (err, user) => {
   if(err) {
     console.log(err)
   }
  
  console.log('afterupdate',user)
  res.send(user)
})
})

app.get('/activeuser', (req, res)=> {
  if (loggedInUser === null){
    res.json({user: null})
  }else{
  User.findOne({email:loggedInUser}, (err, user )=>{
    res.json ({user})
  })
}
})

app.post('/activeuser', (req, res) => {
  
  const { email } = req.body
  loggedInUser= email
  if(email !== null){
  User.findOne({email: email}, (err, user) => {
    if(err) {
      console.log(err)
    } else if (user) {
      console.log('returning person')
      res.json({user})
    } else {
      const newUser = new User({
        email: email,
        myTeams: []
      })
      newUser.save((err, savedUser) => {
        console.log('register')
        if (err) return res.json(err)
        res.json({user: savedUser})
      })
    }
  })
}
})

//LEAGUE HIERARCHY
app.get('/league/NFL', (req, res) => {
  axios.get('http://api.sportradar.us/nfl/official/trial/v5/en/league/hierarchy.json?api_key=en574j8g5ubzcmngajxye25z')
  .then(({data}) =>{
    let afcEast = data.conferences[0].divisions[0].teams
    let afcNorth = data.conferences[0].divisions[1].teams
    let afcSouth = data.conferences[0].divisions[2].teams
    let afcWest = data.conferences[0].divisions[3].teams
    let nfcEast = data.conferences[1].divisions[0].teams
    let nfcNorth = data.conferences[1].divisions[1].teams
    let nfcSouth = data.conferences[1].divisions[2].teams
    let nfcWest = data.conferences[1].divisions[3].teams

    res.json({ afcEast, afcNorth, afcSouth, afcWest, nfcEast, nfcNorth, nfcSouth, nfcWest})
  })
})

//LEAGUE HIERARCHY
app.get('/league/NBA', (req, res) => {
  axios.get('https://api.sportradar.us/nba/trial/v5/en/league/hierarchy.json?api_key=s266me4twb35x3hbmdaww2ps')
  .then(({data}) =>{
    let divSouthEast = data.conferences[0].divisions[0].teams
    let divAtlantic = data.conferences[0].divisions[1].teams
    let divCentral = data.conferences[0].divisions[2].teams
    let divNorthWest = data.conferences[1].divisions[0].teams
    let divSouthWest = data.conferences[1].divisions[1].teams
    let divPacific = data.conferences[1].divisions[2].teams
    
    res.json({divNorthWest, divSouthWest, divPacific, divSouthEast, divAtlantic, divCentral })
  })
})

//LEAGUE HIERARCHY
app.get('/league/NHL', (req, res) => {
  axios.get('https://api.sportradar.us/nhl/trial/v6/en/league/hierarchy.json?api_key=5bjqzr55w8w23s7tbhxqtmuz')
  .then(({data}) =>{
    let divPacific = data.conferences[0].divisions[0].teams
    let divCentral = data.conferences[0].divisions[1].teams
    let divAtlantic = data.conferences[1].divisions[0].teams
    let divMet = data.conferences[1].divisions[1].teams

    res.json({ divPacific, divCentral, divAtlantic, divMet })
  })
})

//LEAGUE HIERARCHY
app.get('/league/MLB', (req, res) => {
  axios.get('https://api.sportradar.us/mlb/trial/v6.5/en/league/hierarchy.json?api_key=e3jnm83des4smz6fb4djet7s')
  .then(({data}) =>{
    let alEast = data.leagues[0].divisions[0].teams
    let alCentral = data.leagues[0].divisions[1].teams
    let alWest = data.leagues[0].divisions[2].teams
    let nlEast = data.leagues[1].divisions[0].teams
    let nlCentral = data.leagues[0].divisions[1].teams
    let nlWest = data.leagues[1].divisions[2].teams

    res.json({ alEast, alCentral, alWest, nlEast, nlCentral, nlWest})
  })
})

getNflUrl = (teamId) => {
  return `http://api.sportradar.us/nfl/official/trial/v5/en/teams/${teamId}/profile.json?api_key=rzdwe98pn3xqqjtan5wqan2j`
}

getNbaUrl = (teamId) => {
  return `http://api.sportradar.us/nba/trial/v5/en/teams/${teamId}/profile.json?api_key=s266me4twb35x3hbmdaww2ps`
}

getNhlUrl = (teamId) => { 
  return `http://api.sportradar.us/nhl/trial/v6/en/teams/${teamId}/profile.json?api_key=5bjqzr55w8w23s7tbhxqtmuz`
}

getMlbUrl = (teamId) => {
  return `http://api.sportradar.us/mlb/trial/v6.5/en/teams/${teamId}/profile.json?api_key=e3jnm83des4smz6fb4djet7s`
}

//TEAM PROFILES
app.get('/:league/team/:teamId', (req, res) => {
  if (req.params.league === 'MLB') {
  axios.get(getMlbUrl(req.params.teamId))
  .then(({data}) => {
    let teamInfo = data
    res.json({teamInfo})
  })
} else if (req.params.league === 'NBA') {
  axios.get(getNbaUrl(req.params.teamId))
  .then(({data}) => {
    let teamInfo = data
    res.json({teamInfo})
  })
} else if (req.params.league === 'NFL') {
  axios.get(getNflUrl(req.params.teamId))
  .then(({data}) => {
    let teamInfo = data
    res.json({teamInfo})
  })
} else if (req.params.league === 'NHL') {
  axios.get(getNhlUrl(req.params.teamId))
  .then(({data}) => {
    let teamInfo = data
    res.json({teamInfo})
  })
}
})

//TEAM STATS
getTeamStatsNba = (teamId) => {
  return `https://api.sportradar.us/nba/trial/v5/en/seasons/2018/REG/teams/${teamId}/statistics.json?api_key=s266me4twb35x3hbmdaww2ps`
}

getTeamStatsMlb = (teamId) => {
  return `http://api.sportradar.us/mlb/trial/v6.5/en/seasons/2018/REG/teams/${teamId}/statistics.json?api_key=e3jnm83des4smz6fb4djet7s`
}

getTeamStatsNfl = (teamId) => {
  return `https://api.sportradar.us/nfl/official/trial/v5/en/seasons/2018/REG/teams/${teamId}/statistics.json?api_key=rzdwe98pn3xqqjtan5wqan2j`
}

getTeamStatsNhl = (teamId) => {
  return `https://api.sportradar.us/nhl/trial/v5/en/seasons/2018/REG/teams/${teamId}/statistics.json?api_key=5bjqzr55w8w23s7tbhxqtmuz`}

app.get('/:league/team/:teamId/teamStats', (req, res) => {
  if(req.params.league === 'NHL'){
  axios.get(getTeamStatsNhl(req.params.teamId))
  .then(({data}) => {
    res.json({data})
  })
} else if (req.params.league === 'NBA') {
  axios.get(getTeamStatsNba(req.params.teamId))
  .then(({data}) => {
    res.json({data})
  })
} else if (req.params.league === 'NFL') {
  axios.get(getTeamStatsNfl(req.params.teamId))
  .then(({data}) => {
    res.json({data})
  })
} else if (req.params.league === 'MLB') {
  axios.get(getTeamStatsMlb(req.params.teamId))
  .then(({data}) => {
    res.json({data})  
  })
}
})

//TEAM PLAYERS
getTeamPlayersMlb = (teamId) => {  
  return `https://api.sportradar.us/mlb/trial/v6.5/en/teams/${teamId}/profile.json?api_key=e3jnm83des4smz6fb4djet7s`
}

getTeamPlayersNfl = (teamId) => {
  return `https://api.sportradar.us/nfl/official/trial/v5/en/teams/${teamId}/profile.json?api_key=rzdwe98pn3xqqjtan5wqan2j`
}

getTeamPlayersNhlNba = (teamId, league, api) => {
          
  return `https://api.sportradar.us/${league}/trial/v5/en/teams/${teamId}/profile.json?api_key=${api}`
}

app.get('/:league/team/:teamId/players', (req, res) => {
  if(req.params.league === 'MLB') {
  axios.get(getTeamPlayersMlb(req.params.teamId))
  .then(({data})=>{
    let players = data.players
    res.json({players})
  })
} else if (req.params.league === 'NHL') {
  axios.get(getTeamPlayersNhlNba(req.params.teamId, 'nhl', apiNhl))
  .then(({data})=> {
    let players = data.players
    res.json({players})
  })
} else if (req.params.league === 'NBA') {
  axios.get(getTeamPlayersNhlNba(req.params.teamId, 'nba', apiNba))
  .then(({data})=> {
    let players = data.players
    res.json({players})
  })
} else if (req.params.league === 'NFL') {
  axios.get(getTeamPlayersNfl(req.params.teamId))
  .then(({data})=> {
    let players = data.players
    res.json({players})
  })
} 
})


//TEAM STANDINGS
getTeamStandingsNbaNhl = (league, api) => {
  return `https://api.sportradar.us/${league}/trial/v5/en/seasons/2018/REG/standings.json?api_key=${api}`
}

getTeamStandingsNfl = () => {
  return `https://api.sportradar.us/nfl/official/trial/v5/en/seasons/2018/standings.json?api_key=rzdwe98pn3xqqjtan5wqan2j`
}

getTeamStandingsMlb = () => {
  return `https://api.sportradar.us/mlb/trial/v6.5/en/seasons/2018/REG/standings.json?api_key=e3jnm83des4smz6fb4djet7s`
}

app.get('/:league/team/:teamId/standings', (req, res) => {
  if(req.params.league === 'NBA') {
  axios.get(getTeamStandingsNbaNhl('nba', apiNba))
  .then(({data}) => {
    let east = []
    let west = []
    let divSouthEast = data.conferences[1].divisions[0].teams
    let divAtlantic = data.conferences[1].divisions[1].teams
    let divCentral = data.conferences[1].divisions[2].teams
    let divNorthWest = data.conferences[0].divisions[0].teams
    let divSouthWest = data.conferences[0].divisions[1].teams
    let divPacific = data.conferences[0].divisions[2].teams

    east = east.concat(divSouthEast, divAtlantic, divCentral)
    west = west.concat(divNorthWest, divSouthWest, divPacific)
    res.json({east, west})
  })
} else if (req.params.league === 'NHL') {
  axios.get(getTeamStandingsNbaNhl('nhl', apiNhl))
  .then(({data}) => {
    let east = []
    let west = []
    let divPacific = data.conferences[0].divisions[0].teams
    let divCentral = data.conferences[0].divisions[1].teams
    let divAtlantic = data.conferences[1].divisions[0].teams
    let divMet = data.conferences[1].divisions[1].teams

    west = west.concat(divPacific, divCentral)
    east = east.concat(divAtlantic, divMet)
    res.json({east, west})
  })
} else if (req.params.league === 'NFL') {
  axios.get(getTeamStandingsNfl())
  .then(({data}) => {
    let afc = []
    let nfc = []
    let afcEast = data.conferences[0].divisions[0].teams
    let afcSouth = data.conferences[0].divisions[1].teams
    let afcNorth =  data.conferences[0].divisions[2].teams
    let afcWest = data.conferences[0].divisions[3].teams
    let nfcEast = data.conferences[1].divisions[0].teams
    let nfcSouth = data.conferences[1].divisions[1].teams
    let nfcNorth = data.conferences[1].divisions[2].teams
    let nfcWest = data.conferences[1].divisions[3].teams

    afc = afc.concat(afcEast, afcSouth, afcNorth, afcWest)
    nfc = nfc.concat(nfcEast, nfcNorth, nfcSouth, nfcWest)
    res.json({afc, nfc})
  })
} else if (req.params.league === 'MLB') {
  axios.get(getTeamStandingsMlb())
  .then(({data}) => {
    let al = []
    let nl = []
    let nlEast = data.league.season.leagues[0].divisions[0].teams
    let nlCentral = data.league.season.leagues[0].divisions[1].teams
    let nlWest = data.league.season.leagues[0].divisions[2].teams
    let alEast = data.league.season.leagues[1].divisions[0].teams
    let alCentral = data.league.season.leagues[1].divisions[1].teams
    let alWest = data.league.season.leagues[1].divisions[2].teams

    al = al.concat(alEast, alWest, alCentral)
    nl = nl.concat(nlEast, nlWest, nlCentral)
    res.json({al, nl})
  })
}
}) 

//SCHEDULE

getTeamScheduleNbaNhl = (league, api) => {
  return `https://api.sportradar.us/${league}/trial/v5/en/games/2018/REG/schedule.json?api_key=${api}`
}

getTeamScheduleMlb = () => {
  return `https://api.sportradar.us/mlb/trial/v6.5/en/games/2018/REG/schedule.json?api_key=e3jnm83des4smz6fb4djet7s`
}

getTeamScheduleNfl = () => {
  return `https://api.sportradar.us/nfl/official/trial/v5/en/games/2018/reg/schedule.json?api_key=rzdwe98pn3xqqjtan5wqan2j`
}

app.get('/:league/team/:teamId/schedule', (req, res) => {
  if(req.params.league === 'NBA') {
    axios.get(getTeamScheduleNbaNhl('nba', apiNba))
    .then(({data}) => {
      let teamGames = data.games.filter(game=>{
          if(game.home.id === req.params.teamId || game.away.id === req.params.teamId){
            return true
          } else {
            return false
          }
        }).map(game => ({
          start: game.scheduled,
          homeTeam: game.home.alias,
          awayTeam: game.away.alias,
          homeTeamScore: game.home_points,
          awayTeamScore: game.away_points
        }))

      res.json({teamGames})
    })
  } else if(req.params.league === 'NHL') {
    axios.get(getTeamScheduleNbaNhl('nhl', apiNhl))
    .then(({data}) => {
      let teamGames = data.games.filter(game=>{
          if(game.home.id === req.params.teamId || game.away.id === req.params.teamId){
            return true
          } else {
            return false
          }
        }).map(game => ({
          start: game.scheduled,
          homeTeam: game.home.alias,
          awayTeam: game.away.alias,
          homeTeamScore: game.home_points,
          awayTeamScore: game.away_points
        }))

      res.json({teamGames})
    })
  } else if(req.params.league === 'MLB') {
    axios.get(getTeamScheduleMlb())
    .then(({data}) => {
      let teamGames = data.games.filter(game=>{
          if(game.home.id === req.params.teamId || game.away.id === req.params.teamId){
            return true
          } else {
            return false
          }
        }).map(game => ({
          start: game.scheduled,
          homeTeam: game.home.abbr,
          awayTeam: game.away.abbr,
          homeTeamScore: game.home_points,
          awayTeamScore: game.away_points
        }))

      res.json({teamGames})
    })
  } else if(req.params.league === 'NFL') {
    axios.get(getTeamScheduleNfl())
    .then(({data}) => {
      let allGames = []
      data.weeks.forEach(week => {
        week.games.forEach(game => {
          allGames.push(game)
        })
      })
      
      let teamGames = allGames.filter((game, index)=>{
          if(game.home.id === req.params.teamId || game.away.id === req.params.teamId){
            return true
          } else {
            return false
          }
        }).map(game => ({
          start: game.scheduled,
          homeTeam: game.home.alias,
          awayTeam: game.away.alias,
          homeTeamScore: game.home_points,
          awayTeamScore: game.away_points
        }))
      
      res.json({teamGames})
    })
  }
})



app.listen(8080, ()=> {
  console.log('Listening on 8080...')
})