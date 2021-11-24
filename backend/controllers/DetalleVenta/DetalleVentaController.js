var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceDetalleVenta')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')

const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.get('/consultar-detalleventas', function (req, res) {
    service.seleccionarDetalleVentas()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/agregar-detalleventa', validador.validate(validador.detalleVentaValidacion), (req, res)=>{
    let numVenta = req.body.numVenta;
    let idProducto = req.body.idProducto;
    let cantidadProducto = req.body.cantidadProducto;
    let total = req.body.total;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(numVenta) || !validador.validarDatos(idProducto) || !validador.validarDatos(cantidadProducto) || !validador.validarDatos(total)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.agregarDetalleVenta(numVenta, idProducto, cantidadProducto, total)
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