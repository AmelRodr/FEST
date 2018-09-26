const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const plm = require('passport-local-mongoose')

const userSchema = new Schema({
  email:  String,
  username: {
    type: String,
    unique: true
  },
  name:String,
  role:{
    type:String,
    enum:['Cliente', 'Empresa'],
    default: 'Cliente'
  },
  photoURL: String,
  bio:String,
  photoGallery:{
    type:Schema.Types.ObjectId,
    ref:'Galeria'
  },
  rating:{
    type:String,
    enum : ['EXCELENTE','NORMAL','MALO'],
    default: 'NORMAL'
  },
  category:{
    type:String,
    enum:['Musica','Animación', 'Gastronomía', 'Juegos','Bebidas','Decoración y Ambiente','Video y Fotografía']
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.plugin(plm,{usernameField:'username'})
const User = mongoose.model('User', userSchema);
module.exports = User;
