const yup = require('yup');

function validarDatos(data) {
    let valid = true;

    if (data == null || data == '' || data == undefined)
        valid = false

    return valid;
}

function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);

            next();
        } catch (error) {
            res.status(400).json({
                status: 'Error',
                message: error.message,
            });
        }
    };
}

/* Validacion para productos */
function productoValidacion(data) {
    const schema = yup.object().shape({
        nombreProducto: yup.string().max(1000).required(),
        descProducto: yup.string().max(100).required(),
        precioProducto: yup.number().positive().required(),
        stockProducto: yup.number().integer().positive().required(),
        idCategoria: yup.number().integer().positive().required(),
    });
    
    schema.validateSync(data);
}

function productoUpdateValidacion(data) {
    const schema = yup.object().shape({
        nombreProducto: yup.string().max(1000).required(),
        descProducto: yup.string().max(100).required(),
        precioProducto: yup.number().positive().required(),
        stockProducto: yup.number().integer().positive().required(),
        idCategoria: yup.number().integer().positive().required(),
        idProducto: yup.number().integer().positive().required(),
    });
    
    schema.validateSync(data);
}

/* Validacion para detalles de venta */

function detalleVentaValidacion(data) {
    const schema = yup.object().shape({
        numVenta: yup.number().integer().positive().required(),
        idProducto: yup.number().integer().positive().required(),
        cantidadProducto: yup.number().integer().positive().required(),
        total: yup.number().positive().required(),
    });
    
    schema.validateSync(data);
}

/* Validacion para imagenes de productos */
function imagenValidacion(data) {
    const schema = yup.object().shape({
        idProducto: yup.number().integer().positive().required(),
        urlImage: yup.string().max(100).required()
    });
    
    schema.validateSync(data);
}

function imagenUpdateValidacion(data) {
    const schema = yup.object().shape({
        idProducto: yup.number().integer().positive().required(),
        urlImage: yup.string().max(100).required(),
        idImagen: yup.number().integer().positive().required(),
    });
    
    schema.validateSync(data);
}

/* Validacion para usuarios */
function usuarioValidacion(data) {
    const schema = yup.object().shape({
        nombreUsuario: yup.string().max(100).required(),
        correoUsuario: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/).required(),
        contrasena: yup.string().max(100).required(),
        telefonoUsuario: yup.string().min(7).required(),
        direccion: yup.string().max(100).required(),
        idRol: yup.number().integer().positive().required(),
    });
    
    console.log(schema.validateSync(data));
}

function loginValidacion(data) {
    const schema = yup.object().shape({
        correoUsuario: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/).required(),
        contrasena: yup.string().max(100).required(),
    });
    
    schema.validateSync(data);
}

function usuarioUpdateValidacion(data) {
    const schema = yup.object().shape({
        nombreUsuario: yup.string().max(100).required(),
        correoUsuario: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/).required(),
        contrasena: yup.string().max(100).required(),
        telefonoUsuario: yup.number().min(7).required(),
        direccion: yup.string().max(100).required(),
        idRol: yup.number().integer().positive().required(),
        idUsuario: yup.number().integer().positive().required()
    });
    
    schema.validateSync(data);
}

/* Validacion para valoraciones de productos */
function valoracionValidacion(data) {
    const schema = yup.object().shape({
        idUsuario: yup.number().integer().positive().required(),
        idProducto: yup.number().integer().positive().required(),
        calificacion: yup.number().integer().positive().required(),
    });
    
    schema.validateSync(data);
}

/* Validacion para ventas */
function ventaValidacion(data) {
    const schema = yup.object().shape({
        fechaVenta: yup.date().required(),
        totalVenta: yup.number().positive().required(),
        idUsuario: yup.number().integer().positive().required(),
    });
    
    schema.validateSync(data);
}

module.exports = {
    validarDatos: validarDatos,
    validate,
    productoValidacion,
    productoUpdateValidacion,
    loginValidacion,
    usuarioUpdateValidacion,
    detalleVentaValidacion,
    imagenValidacion,
    imagenUpdateValidacion,
    usuarioValidacion,
    valoracionValidacion,
    ventaValidacion
}