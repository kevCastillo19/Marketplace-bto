const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaDetalleVenta.json')

function seleccionarDetalleVentas() {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectDetalleVentas, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function agregarDetalleVenta(numVenta, idProducto, cantidadProducto, total){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertDetalleVenta,[numVenta, idProducto, cantidadProducto, total],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

module.exports = {
    agregarDetalleVenta: agregarDetalleVenta,
    seleccionarDetalleVentas: seleccionarDetalleVentas
}