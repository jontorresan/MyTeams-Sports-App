const mongoose = require('mongoose')
const Schema = mongoose.Schema


mongoose.promise = Promise

const userSchema = new Schema({

	email: { type: String, unique: false, required: true },
  myTeams: {type: Array, unique: false, required: false}

})


const User = mongoose.model('User', userSchema)
module.exports = User



