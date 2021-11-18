const conexion = require('../conexion/conexionDB')
const propertiesConsulta = require('../utilidades/ConsultaProducto.json')

function seleccionarProductos() {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectProductos, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

module.exports = {
    seleccionarProductos: seleccionarProductos
}