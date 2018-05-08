'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WishSchema = Schema({
  lista: String,
  pass: String,
  items: [
    {
      _id: Schema.Types.ObjectId,
      categoria: String,
      nombre: String,
      precio: Number,
      url: String,
      image: String
    }
  ]
});

// exportamos el modelo
module.exports = mongoose.model('Wish', WishSchema);
