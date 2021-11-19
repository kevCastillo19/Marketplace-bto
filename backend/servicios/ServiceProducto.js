const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaProducto.json')
var serviceImagen = require('../servicios/ServiceImagen')

function seleccionarProductos() {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectProductos, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}


function seleccionarProductoDetalle(idProducto) {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectProductoDetalle,[idProducto],(err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function agregarProducto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria,imagen){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.SP_AgregaProducto,[nombreProducto,descProducto,precioProducto,stockProducto,idCategoria,imagen],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}
function actualizarProducto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria,idProducto){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.UpdateProducto,[nombreProducto,descProducto,precioProducto,stockProducto,idCategoria,idProducto],(err,resultado)=>{
            if(err) reject(err)
            else { 
                resolve(resultado)
            }
        });
    });
}

function eliminarProducto(idProducto){
    return new Promise((resolve, reject)=>{
        conexion.query(propertiesConsulta.DeleteProducto,[idProducto], (err, resultado)=>{
            if(err) reject(err)
            else resolve(resultado)
        });
    });
}

module.exports = {
    seleccionarProductos: seleccionarProductos,
    agregarProducto: agregarProducto,
    seleccionarProductoDetalle: seleccionarProductoDetalle,
    actualizarProducto: actualizarProducto,
    eliminarProducto: eliminarProducto
}