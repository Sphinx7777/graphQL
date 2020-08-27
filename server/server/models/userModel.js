const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const Schema = mongoose.Schema

const UserModel = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    token: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
    password: String,
    role: String,
    fullName: String,
    createdDate: Date,
    lastDateOfActive: Date
})

UserModel.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.isNew) {
      this.createdAt = Date.now();
      this.secret = shortid.generate();
  }

  //!!! the following lines of the code have to be last in the SAVE callback
  //!!! --------------------------------------------------------------------
  if (!this.isModified('password')) {
      return next()
  }

  bcrypt.hash(this.password, 10, (hashError, encrypted) => {
      if (hashError) {
          return next(hashError);
      }

      // replace a password string with hash value
      this.password = encrypted;

      return next();
  });
  //!!! --------------------------------------------------------------------
  });

module.exports = mongoose.model('users', UserModel)