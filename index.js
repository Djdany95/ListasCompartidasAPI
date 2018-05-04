'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port = process.env.PORT || 3678

mongoose.connect('mongodb://listascompartidas:driger123@ds115740.mlab.com:15740/heroku_kg4kr9kd', (err, res) => {

    if (err) {
        throw err;
    } else {
        console.log('Conexión a mongodb correcta.')
        app.listen(port, () => {
            console.log("API ListaCompra funcionando");
        });
    }
});