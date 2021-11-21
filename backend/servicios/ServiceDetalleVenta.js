const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaDetalleVenta.json')

function agregarDetalleVenta(numVenta, idProduct, cantidadProducto, total){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.InsertDetalleVenta,[numVenta, idProduct, cantidadProducto, total],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

module.exports = {
    agregarDetalleVenta: agregarDetalleVenta
}