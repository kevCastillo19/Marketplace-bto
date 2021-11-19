const express = require('express')
const bodyParser = require('body-parser')

const mantenimientoProducto = require('./controllers/producto/ProductoController')
const mantenimientoImagen = require('./controllers/Imagen/ImagenController')

const app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

app.use('/Producto', mantenimientoProducto);
app.use('/Imagen', mantenimientoImagen);
 

app.listen(3000,() => {
    console.log('server running');
});