var express = require('express')
const jwt = require('jsonwebtoken')

var Catservice = require('../../servicios/ServiceCategoria')

//const mensajes = require('../../utilidades/Mensajes.json')
//const validador = require('../../servicios/Validate')
const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.get('/consultar-categoria', function (req, res) {
    Catservice.seleccionarCategorias()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});


module.exports=router;