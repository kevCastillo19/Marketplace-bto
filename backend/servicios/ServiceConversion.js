const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaConversion.json')

function seleccionarConversiones() {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectConversiones, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function agregarConversion(numVenta, tipoMoneda, valorMoneda, montoIngresado, fechaConversion){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertConversion,[numVenta, tipoMoneda, valorMoneda, montoIngresado, fechaConversion],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

module.exports = {
    agregarConversion: agregarConversion,
    seleccionarConversiones: seleccionarConversiones
}