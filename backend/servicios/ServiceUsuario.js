const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaUsuario.json')

function seleccionarUsuarios() {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectUsuarios, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function seleccionarUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectUsuario,[idUsuario], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function agregarUsuario(nombreUsuario,correoUsuario,contrasena,telefonoUsuario,direccion){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertUsuario,[nombreUsuario,correoUsuario,contrasena,telefonoUsuario,direccion],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

function actualizarUsuario(nombreUsuario,correoUsuario,contrasena,telefonoUsuario,direccion,idUsuario){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.UpdateUsuario,[nombreUsuario,correoUsuario,contrasena,telefonoUsuario,direccion,idUsuario],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

function login(correoUsuario, contrasena) {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.LoginUsuario,[correoUsuario, contrasena], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

module.exports = {
    seleccionarUsuarios: seleccionarUsuarios,
    seleccionarUsuario: seleccionarUsuario,
    agregarUsuario: agregarUsuario,
    actualizarUsuario: actualizarUsuario,
    login: login
}