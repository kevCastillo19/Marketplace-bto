const express = require('express')
const bodyParser = require('body-parser')

const mantenimientoProducto = require('./controllers/producto/ProductoController')
const mantenimientoImagen = require('./controllers/Imagen/ImagenController')
const mantenimientoUsuario = require('./controllers/usuario/UsuarioController')

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json({
    type: 'application/json'
}));

app.get('/test', (req, res)=>{
    res.status(500).send({msg:"it works!"})
    
});


app.use('/Producto', mantenimientoProducto);
app.use('/Imagen', mantenimientoImagen);
app.use('/Usuario', mantenimientoUsuario);

app.listen(PORT,() => {
    console.log('server running');
});