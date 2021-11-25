const conexion = require('../conexion/conexionDB')
const propertiesConsultaCat = require("../utilidades/ConsultaCategoria.json")

function seleccionarCategorias(){
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsultaCat.SelectCategoria, (err, resultado)=>{
            if(err) reject(err)
            else resolve(resultado)
        })
    })
}

module.exports = {
    seleccionarCategorias: seleccionarCategorias
}

