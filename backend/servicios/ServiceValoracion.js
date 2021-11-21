const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaValoracion.json')

function seleccionarValoraciones() {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectValoraciones, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function seleccionarValoracion(idProducto) {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectValoracion,[idProducto], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function agregarValoracion(idUsuario, idProducto, calificacion){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertValoracion,[idUsuario, idProducto, calificacion],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

function actualizarValoracion(calificacion, idUsuario, idProducto){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.UpdateValoracion,[calificacion, idUsuario, idProducto],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

module.exports = {
    seleccionarValoracion: seleccionarValoracion,
    agregarValoracion: agregarValoracion,
    actualizarValoracion: actualizarValoracion,
    seleccionarValoraciones: seleccionarValoraciones
}