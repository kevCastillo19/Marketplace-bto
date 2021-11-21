const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaConversion.json')

function agregarConversion(tipoMoneda, valorMoneda, montoIngresado, fechaConversion){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertConversion,[tipoMoneda, valorMoneda, montoIngresado, fechaConversion],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

module.exports = {
    agregarConversion: agregarConversion
}