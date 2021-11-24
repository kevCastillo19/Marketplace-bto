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

router.post('/agregar-venta', validador.validate(validador.ventaValidacion), (req, res)=>{
    let fechaVenta = req.body.fechaVenta;
    let totalVenta = req.body.totalVenta;
    let idUsuario = req.body.idUsuario;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(fechaVenta) || !validador.validarDatos(totalVenta) || !validador.validarDatos(idUsuario)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);
    }

    service.agregarVenta(fechaVenta,totalVenta,idUsuario)
    .then(data=>{
        respuesta.mensaje = mensajes.mensajeOK
        res.status(200);
    })
    .catch(err=>{
        respuesta.status = 500; 
            respuesta.mensaje = mensajes.mensajeError
            res.status(500);
    })
    res.json(respuesta);

});

module.exports=router;