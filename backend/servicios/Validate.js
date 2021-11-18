function validarDatos(data) {
    let valid = true;

    if (data == null || data == '' || data == undefined)
        valid = false

    return valid;
}

module.exports = {
    validarDatos: validarDatos
}