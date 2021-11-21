var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceValoracion')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')

const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.get('/consultar-valoraciones', function (req, res) {
    service.seleccionarValoraciones()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/agregar-valoracion', (req, res)=>{
    let idUsuario = req.body.idUsuario;
    let idProducto = req.body.idProducto;
    let calificacion = req.body.calificacion;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(idUsuario) || !validador.validarDatos(idProducto) || !validador.validarDatos(calificacion)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.agregarValoracion(idUsuario, idProducto, calificacion)
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

router.put('/actualizar-valoracion', (req, res)=>{
    let calificacion = req.body.calificacion;
    let idUsuario = req.body.idUsuario;
    let idProducto = req.body.idProducto;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(calificacion) || !validador.validarDatos(idUsuario) || !validador.validarDatos(idProducto)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.actualizarValoracion(calificacion, idUsuario, idProducto)
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

router.get('/consultar-valoracion/:idProducto', function (req, res) {

    let idProducto = req.params.idProducto;

    if (!validador.validarDatos(idProducto)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.seleccionarValoracion(idProducto)
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});


module.exports=router;