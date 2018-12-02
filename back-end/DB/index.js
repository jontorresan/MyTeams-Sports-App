const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const uri = 'mongodb+srv://jontorresan:Canucks99@cluster0-pu6i8.mongodb.net/User?retryWrites=true' 

mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => { 
    console.log('Connected to Mongo');
  },
  err => {
    console.log('error connecting to Mongo: ')
    console.log(err);
  }
)


module.exports = mongoose.connection