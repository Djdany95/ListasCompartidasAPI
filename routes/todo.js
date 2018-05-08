'use strict';

var express = require('express');
var TodoController = require('../controllers/todo');
var todo = express.Router();

todo.post('/getlist/', TodoController.getList);
todo.post('/list/', TodoController.newList);
todo.post('/renamelist/', TodoController.editList);
todo.delete('/list/', TodoController.delList);
todo.post('/item/', TodoController.addItem);
todo.delete('/item/', TodoController.delItem);

module.exports = todo;
