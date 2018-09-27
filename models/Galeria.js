var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var galeriaSchema = new Schema({
  path:[String]
  
});

module.exports = mongoose.model('Galeria', galeriaSchema);