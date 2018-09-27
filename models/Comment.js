const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  text:String,
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  provider:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
},{
  timestamps:{
    updatedAt:"update_at",
    createdAt:"created_at"
  }
})

module.exports = mongoose.model('Comment', commentSchema)