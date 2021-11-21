const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaVenta.json')

function agregarVenta(fechaVenta,totalVenta,idUsuario){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertVenta,[fechaVenta,totalVenta,idUsuario],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

module.exports = {
    agregarVenta: agregarVenta
}