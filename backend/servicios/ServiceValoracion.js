const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaValoracion.json')

function seleccionarValoracion(idUsuario, idProducto) {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectValoracion,[idUsuario, idProducto], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function agregarValoracion(idUsuario, idProducto, valoracion){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertValoracion,[idUsuario, idProducto, valoracion],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

function actualizarValoracion(valoracion, idUsuario, idProducto){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.UpdateValoracion,[valoracio, valoracion, idProducto],(err,resultado)=>{
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
    actualizarValoracion: actualizarValoracion
}