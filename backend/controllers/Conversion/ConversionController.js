var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceConversion')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')

const TOKEN_SECRET = "bytheone$2021";

const axios = require('axios').default;

var router = express.Router();

router.get('/consultar-euro', function (req, res) {
    axios({
        method: 'get',
        url: 'https://v6.exchangerate-api.com/v6/6b03a4bfdb7e536c8a419f10/pair/USD/EUR',
        responseType: 'json'
    })
    .then(result => {
        res.status(200).json(result.data)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/consultar-bitcoin', function (req, res) {
    axios({
        method: 'get',
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        responseType: 'json'
    })
    .then(result => {
        res.status(200).json(result.data.bpi.USD)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/consultar-conversiones', function (req, res) {
    service.seleccionarConversiones()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/agregar-conversion',validador.validate(validador.conversionValidacion), (req, res)=>{
    let numVenta = req.body.numVenta;
    let tipoMoneda = req.body.tipoMoneda;
    let valorMoneda = req.body.valorMoneda;
    let montoIngresado = req.body.montoIngresado;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(numVenta) || !validador.validarDatos(tipoMoneda) || !validador.validarDatos(valorMoneda) 
    || !validador.validarDatos(montoIngresado)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.agregarConversion(numVenta, tipoMoneda, valorMoneda, montoIngresado)
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