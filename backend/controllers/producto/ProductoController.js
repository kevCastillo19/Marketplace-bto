var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceProducto')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')
const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.get('/consultar-producto', function (req, res) {
    service.seleccionarProductos()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});



function autenticarToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({"Mensaje":"Debe iniciar sesion"})

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.status(401).json({"Mensaje":"Debe iniciar sesion"})

        req.user = user

        next();
    })

}

module.exports=router;