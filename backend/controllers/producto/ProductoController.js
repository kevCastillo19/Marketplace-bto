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

router.get('/consultar-productoDetalle/:idProducto', function (req, res) {

    let idProducto = req.params.idProducto;

    if (!validador.validarDatos(idProducto)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.seleccionarProductoDetalle(idProducto)
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.delete('/eliminar-producto/:idProducto', function (req, res) {

    let idProducto = req.params.idProducto;

    if (!validador.validarDatos(idProducto)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.eliminarProducto(idProducto)
        .then(result => {
            respuesta.mensaje = mensajes.MensajeDeleted
            res.status(200).json(respuesta)
        })
        .catch(err => {
            respuesta.mensaje = mensajes.mensajeError

            res.status(500).json(respuesta)
        })
});

router.post('/agregar-producto', validador.validate(validador.productoValidacion), (req, res)=>{
    let nombreProducto = req.body.nombreProducto;
    let descProducto = req.body.descProducto;
    let precioProducto = req.body.precioProducto;
    let stockProducto = req.body.stockProducto;
    let idCategoria = req.body.idCategoria;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(nombreProducto) || !validador.validarDatos(descProducto)
     || !validador.validarDatos(precioProducto) || !validador.validarDatos(stockProducto) 
     || !validador.validarDatos(idCategoria)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.agregarProducto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria)
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

router.put('/actualizar-producto', validador.validate(validador.productoUpdateValidacion), (req, res)=>{
    let nombreProducto = req.body.nombreProducto;
    let descProducto = req.body.descProducto;
    let precioProducto = req.body.precioProducto;
    let stockProducto = req.body.stockProducto;
    let idCategoria = req.body.idCategoria;
    let idProducto = req.body.idProducto;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(nombreProducto) || !validador.validarDatos(descProducto)
    || !validador.validarDatos(precioProducto) || !validador.validarDatos(stockProducto) 
    || !validador.validarDatos(idCategoria) || !validador.validarDatos(idProducto)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.actualizarProducto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria,idProducto)
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
})

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