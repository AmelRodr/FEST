const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const plm = require('passport-local-mongoose')

const providerSchema = new Schema({
  email:  String,
  username: {
    type: String,
    unique: true
  },
  password: String,
  photoURL: String,
  bio:String,
  photoGallery:{
    type:Schema.Types.ObjectId,
    ref:'Galeria'
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

providerSchema.plugin(plm,{usernameField:'email'})
const Provider = mongoose.model('Provider', providerSchema);
module.exports = Provider;