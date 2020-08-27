const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserModel = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    token: String,
    password: String,
    role: String,
    fullName: String,
    createdDate: Date,
    lastDateOfActive: Date
})

module.exports = mongoose.model('users', UserModel)