'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = Schema({
  lista: String,
  pass: String,
  items: [
    {
      _id: Schema.Types.ObjectId,
      tachado: Boolean,
      nombre: String,
      prioridad: Number
    }
  ]
});

// exportamos el modelo
module.exports = mongoose.model('Todo', TodoSchema);
