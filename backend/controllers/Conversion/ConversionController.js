var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceConversion')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')

const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.get('/consultar-conversiones', function (req, res) {
    service.seleccionarConversiones()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/agregar-conversion', (req, res)=>{
    let tipoMoneda = req.body.tipoMoneda;
    let valorMoneda = req.body.valorMoneda;
    let montoIngresado = req.body.montoIngresado;
    let fechaConversion = req.body.fechaConversion;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(tipoMoneda) || !validador.validarDatos(valorMoneda) 
    || !validador.validarDatos(montoIngresado) || !validador.validarDatos(fechaConversion)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.agregarConversion(tipoMoneda, valorMoneda, montoIngresado, fechaConversion)
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