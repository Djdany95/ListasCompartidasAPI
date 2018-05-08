const Shopping = require('../models/shopping');
const mongoose = require('mongoose');

function getList(req, res) {
  var lista = req.body.lista;
  var pass = req.body.pass;

  Shopping.findOne({ lista: lista, pass: pass }, { lista: 1, items: 1, _id: 0 })
    .sort('+items.nombre')
    .exec((err, list) => {
      if (err) {
        res.status(500).send({ accion: 'get list', error: 'Server Error 500' });
      } else if (!list) {
        res.status(404).send({ accion: 'get list', error: 'Shopping 404' });
      } else {
        res.status(200).send({ accion: 'get list', data: list });
      }
    });
}

function newList(req, res) {
  var lista = req.body.lista;
  var pass = req.body.pass;

  var list = new Shopping();
  list.lista = lista;
  list.pass = pass;

  list.save((err, listCreated) => {
    if (err) {
      res.status(500).send({
        accion: 'new list',
        error: 'Shopping con esa contraseña ya existe'
      });
    } else {
      res.status(200).send({ accion: 'new list', data: listCreated });
    }
  });
}

function editList(req, res) {
  var params = req.body;

  Shopping.findOneAndUpdate(
    { lista: params.listaOld, pass: params.pass },
    { $set: { lista: params.listaNew } },
    { new: true },
    (err, renamedList) => {
      if (err) {
        res
          .status(500)
          .send({ accion: 'rename list', error: 'Server Error 500' });
      } else if (renamedList === null) {
        res.status(404).send({ accion: 'rename list', error: 'Shopping 404' });
      } else {
        res.status(200).send({ accion: 'rename list', data: renamedList });
      }
    }
  );
}

function delList(req, res) {
  var lista = req.body.lista;
  var pass = req.body.pass;

  Shopping.findOneAndRemove({ lista: lista, pass: pass }, (err, listDeleted) => {
    if (err) {
      res
        .status(500)
        .send({ accion: 'delete list', error: 'Server Error 500' });
    } else {
      res.status(200).send({ accion: 'delete list', data: listDeleted });
    }
  });
}

function addItem(req, res) {
  var params = req.body;

  Shopping.update(
    { lista: params.lista, pass: params.pass },
    {
      $push: {
        items: {
          _id: new mongoose.Types.ObjectId(),
          tachado: params.tachado,
          nombre: params.nombre,
          precio: params.precio
        }
      }
    }
  ).exec((err, newItem) => {
    if (err) {
      res.status(500).send({ accion: 'add item', error: err });
    } else {
      res.status(200).send({ accion: 'add item', data: newItem });
    }
  });
}

function delItem(req, res) {
  var params = req.body;
  const itemId = new mongoose.Types.ObjectId(params.itemId);

  Shopping.update(
    { lista: params.lista, pass: params.pass },
    { $pull: { items: { _id: itemId } } }
  ).exec((err, delItem) => {
    if (err) {
      res
        .status(500)
        .send({ accion: 'delete item', error: 'Server Error 500' });
    } else {
      res.status(200).send({ accion: 'delete item', data: delItem });
    }
  });
}

module.exports = { getList, newList, delList, editList, addItem, delItem };
