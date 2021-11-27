var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceVenta')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')

const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.get('/consultar-ventas', function (req, res) {
    service.seleccionarVentas()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.get('/consultar-ultimaventa', function (req, res) {
    service.seleccionarUltimaVenta()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/agregar-venta',autenticarToken, validador.validate(validador.ventaValidacion), (req, res)=>{
    let fechaVenta = req.body.fechaVenta;
    let totalVenta = req.body.totalVenta;
    let idUsuario = req.body.idUsuario;

    let respuesta = {
        status: 200,
        mensaje: "",
        id
    }

    if (!validador.validarDatos(fechaVenta) || !validador.validarDatos(totalVenta) || !validador.validarDatos(idUsuario)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);
    }

    service.agregarVenta(fechaVenta,totalVenta,idUsuario)
    .then(data=>{
        respuesta.id = data.insertId;
        respuesta.mensaje = mensajes.mensajeOK
        res.json(respuesta);
    })
    .catch(err=>{
        
        respuesta.status = 500; 
            respuesta.mensaje = mensajes.mensajeError
            res.status(500);
    })
    //res.json(respuesta);

});
function autenticarToken(req, res, next) {

    const authHeader = req.headers.authorization
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({"Mensaje":"Debe iniciar sesion"})

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(user)

        if (err) return res.status(401).json({"Mensaje":"Debe iniciar sesion"})

        req.user = user

        next();
    })

}

module.exports=router;