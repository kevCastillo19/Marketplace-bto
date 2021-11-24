var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceUsuario')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')

const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.post('/agregar-usuario', (req, res)=>{
    let nombreUsuario = req.body.nombreUsuario;
    let correoUsuario = req.body.correoUsuario;
    let contrasena = req.body.contrasena;
    let telefonoUsuario = req.body.telefonoUsuario;
    let direccion = req.body.direccion;
    let idRol = req.body.idRol;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(nombreUsuario) || !validador.validarDatos(correoUsuario)
     || !validador.validarDatos(contrasena) || !validador.validarDatos(telefonoUsuario) 
     || !validador.validarDatos(direccion) || !validador.validarDatos(idRol)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.agregarUsuario(nombreUsuario,correoUsuario,contrasena,telefonoUsuario,direccion,idRol)
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

router.put('/actualizar-usuario', (req, res)=>{
    let nombreUsuario = req.body.nombreUsuario;
    let correoUsuario = req.body.correoUsuario;
    let contrasena = req.body.contrasena;
    let telefonoUsuario = req.body.telefonoUsuario;
    let direccion = req.body.direccion;
    let idUsuario = req.body.idUsuario;
    let idRol = req.body.idRol;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(nombreUsuario) || !validador.validarDatos(correoUsuario)
     || !validador.validarDatos(contrasena) || !validador.validarDatos(telefonoUsuario) 
     || !validador.validarDatos(direccion) || !validador.validarDatos(idUsuario) || !validador.validarDatos(idRol)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.actualizarUsuario(nombreUsuario,correoUsuario,contrasena,telefonoUsuario,direccion,idRol,idUsuario)
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

router.post('/login-usuario', function (req, res) {

    let correoUsuario = req.body.correoUsuario;
    let contrasena = req.body.contrasena;
     console.log(req.body);
    service.login(correoUsuario, contrasena)
        .then(result => {
            var usuario={

            };
            if (result.length > 0) {
                var token = generarJWT({nombreUsuario:result[0].nombreUsuario, correoUsuario:result[0].correoUsuario, contrasena:result[0].contrasena, telefonoUsuario:result[0].telefonoUsuario, direccion:result[0].direccion, idRol:result[0].idRol});
                res.status(200).json({token})
            }else{
              res.status(500).json({"status":500,
            "response":"No se encontro el usuario"})
            }
            
        })
        .catch(err => {
            res.status(500).json({error:err}) 
        })
});

router.get('/consultar-usuarios', function (req, res) {
    service.seleccionarUsuarios()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.get('/consultar-usuarioDetalle/:idUsuario', function (req, res) {

    let idUsuario = req.params.idUsuario;

    if (!validador.validarDatos(idUsuario)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        return res.status(400).json(respuesta);

    }

    service.seleccionarUsuario(idUsuario)
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

function generarJWT(usuario) {
    // return jwt.sign(userName, TOKEN_SECRET, { expiresIn: 60 * 60 })
    return jwt.sign(usuario, TOKEN_SECRET);

}

module.exports=router;