const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaImagen.json')

 
function seleccionarImagen(idProducto) {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectImagen,[idProducto], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function agregarImagen(idProducto,urlImagen){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertarImagen,[idProducto,urlImagen],(err,resultado)=>{
            if(err) reject(err)
            else resolve(resultado)
        });
    });
}

function eliminarImagen(idImagen){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.DeleteImagen,[idImagen], (err, resultado)=>{
            if(err) reject(err)
            else resolve(resultado)
        });
    });
}

module.exports = {
    agregarImagen: agregarImagen,
    seleccionarImagen: seleccionarImagen,
    eliminarImagen: eliminarImagen
}