var express = require('express')
const jwt = require('jsonwebtoken')

var service = require('../../servicios/ServiceUsuario')

const mensajes = require('../../utilidades/Mensajes.json')
const validador = require('../../servicios/Validate')

const TOKEN_SECRET = "bytheone$2021";

var router = express.Router();

router.post('/agregar-usuario', validador.validate(validador.usuarioValidacion), (req, res)=>{
    let nombreUsuario = req.body.nombreUsuario;
    let correoUsuario = req.body.correoUsuario;
    let contrasena = req.body.contrasena;
    let telefonoUsuario = req.body.telefonoUsuario;
    let direccion = req.body.direccion;
    let idRol = req.body.idRol;
    console.log(req.body);
    let respuesta = {
        status: 200,
        mensaje: "",
        id:0
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
        console.log('agrega', data.insertId);
        respuesta.mensaje = mensajes.mensajeOK;
        respuesta.id = data.insertId;
        res.json({"status":200,"mensaje":"Se agregó correctamente","id":data.insertId});
    })
    .catch(err=>{
        respuesta.status = 500;
            
            respuesta.mensaje = mensajes.mensajeError
            res.status(500);
    })
    //res.json(respuesta);
});

router.put('/actualizar-usuario', validador.validate(validador.usuarioUpdateValidacion), (req, res)=>{
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

router.post('/login-usuario', validador.validate(validador.loginValidacion), function (req, res) {

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

function generarJWT(usuario) {
    // return jwt.sign(userName, TOKEN_SECRET, { expiresIn: 60 * 60 })
    return jwt.sign(usuario, TOKEN_SECRET);

}

module.exports=router;