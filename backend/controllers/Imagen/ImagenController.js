var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceImagen')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')
const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.get('/consultar-imagenes/:idProducto', function (req, res) {

    let idProducto = req.params.idProducto;

    if (!validador.validarDatos(idProducto)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.seleccionarImagen(idProducto)
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.delete('/eliminar-imagen/:idImagen', function (req, res) {

    let idImagen = req.params.idImagen;

    if (!validador.validarDatos(idImagen)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.eliminarImagen(idImagen)
        .then(result => {
            respuesta.mensaje = mensajes.MensajeDeleted
            res.status(200).json(respuesta)
        })
        .catch(err => {
            respuesta.mensaje = mensajes.mensajeError

            res.status(500).json(respuesta)
        })
});

router.post('/agregar-imagen', validador.validate(validador.imagenValidacion), (req, res)=>{
     
    let idProducto = req.body.idProducto;
    let urlImage = req.body.urlImage;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(idProducto) || !validador.validarDatos(urlImage)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.agregarImagen(idProducto,urlImage)
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
