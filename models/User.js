const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const plm = require('passport-local-mongoose')

const userSchema = new Schema({
  email:  String,
  username: {
    type: String,
    unique: true
  },
  password: String,
  photoURL: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.plugin(plm,{usernameField:'email'})
const User = mongoose.model('User', userSchema);
module.exports = User;
