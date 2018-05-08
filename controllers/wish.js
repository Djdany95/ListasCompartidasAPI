const Wish = require('../models/wish');
const mongoose = require('mongoose');

function getList(req, res) {
  var lista = req.body.lista;

  Wish.findOne({ lista: lista }, { lista: 1, items: 1, _id: 0 })
    .sort('+items.nombre')
    .exec((err, list) => {
      if (err) {
        res.status(500).send({ accion: 'get list', error: 'Server Error 500' });
      } else if (!list) {
        res.status(404).send({ accion: 'get list', error: 'Wish 404' });
      } else {
        res.status(200).send({ accion: 'get list', data: list });
      }
    });
}

function getPass(req, res) {
  var lista = req.body.lista;
  var pass = req.body.pass;

  Wish.findOne({ lista: lista, pass: pass }, { lista: 1, _id: 0 })
    .sort('+items.nombre')
    .exec((err, list) => {
      if (err) {
        res.status(500).send({ accion: 'get list', error: 'Server Error 500' });
      } else if (!list) {
        res.status(404).send({ accion: 'get list', error: 'Wish 404' });
      } else {
        res.status(200).send({ accion: 'get list', data: list });
      }
    });
}

function newList(req, res) {
  var lista = req.body.lista;
  var pass = req.body.pass;

  var list = new Wish();
  list.lista = lista;
  list.pass = pass;

  list.save((err, listCreated) => {
    if (err) {
      res.status(500).send({
        accion: 'new list',
        error: 'Wish con esa contraseña ya existe'
      });
    } else {
      res.status(200).send({ accion: 'new list', data: listCreated });
    }
  });
}

function editList(req, res) {
  var params = req.body;

  Wish.findOneAndUpdate(
    { lista: params.listaOld, pass: params.pass },
    { $set: { lista: params.listaNew } },
    { new: true },
    (err, renamedList) => {
      if (err) {
        res
          .status(500)
          .send({ accion: 'rename list', error: 'Server Error 500' });
      } else if (renamedList === null) {
        res.status(404).send({ accion: 'rename list', error: 'Wish 404' });
      } else {
        res.status(200).send({ accion: 'rename list', data: renamedList });
      }
    }
  );
}

function delList(req, res) {
  var lista = req.body.lista;
  var pass = req.body.pass;

  Wish.findOneAndRemove({ lista: lista, pass: pass }, (err, listDeleted) => {
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
  if (params.image === '') {
    params.image =
      'https://www.latondelafueva.com/wp-content/uploads/2012/08/eshopex-compra.png';
  }

  Wish.update(
    { lista: params.lista, pass: params.pass },
    {
      $push: {
        items: {
          _id: new mongoose.Types.ObjectId(),
          categoria: params.categoria,
          nombre: params.nombre,
          precio: params.precio,
          url: params.url,
          image: params.image
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

  Wish.update(
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

module.exports = {
  getList,
  newList,
  delList,
  editList,
  addItem,
  delItem,
  getPass
};
