const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaVenta.json')

function seleccionarVentas() {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectVentas, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function seleccionarUltimaVenta() {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectFinalVenta, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

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
    agregarVenta: agregarVenta,
    seleccionarUltimaVenta: seleccionarUltimaVenta,
    seleccionarVentas: seleccionarVentas
}