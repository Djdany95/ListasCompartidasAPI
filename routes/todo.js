'use strict';

var express = require('express');
var TodoController = require('../controllers/todo');
var todo = express.Router();

todo.post('/getlist/', TodoController.getList);
todo.post('/list/', TodoController.newList);
todo.post('/renamelist/', TodoController.editList);
todo.post('/item/', TodoController.addItem);
todo.delete('/list/', TodoController.delList);
todo.delete('/item/', TodoController.delItem);

module.exports = todo;
