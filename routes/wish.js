'use strict';

var express = require('express');
var WishController = require('../controllers/wish');
var wish = express.Router();

wish.post('/getlist/', WishController.getList);
wish.post('/getpass/', WishController.getPass);
wish.post('/list/', WishController.newList);
wish.post('/renamelist/', WishController.editList);
wish.post('/item/', WishController.addItem);
wish.delete('/list/', WishController.delList);
wish.delete('/item/', WishController.delItem);

module.exports = wish;
