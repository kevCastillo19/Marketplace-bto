const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const mantenimientoProducto = require('./controllers/producto/ProductoController')
const mantenimientoImagen   = require('./controllers/Imagen/ImagenController')
const mantenimientoUsuario = require('./controllers/usuario/UsuarioController')
const mantenimientoVenta   = require('./controllers/Venta/VentaController')
const mantenimientoDetalleVenta = require('./controllers/DetalleVenta/DetalleVentaController')
const mantenimientoConversion = require('./controllers/Conversion/ConversionController')
const mantenimientoValoracion = require('./controllers/Valoracion/ValoracionController')
const mantenimientoCategoria  = require('./controllers/Categoria/CategoriaController')

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json({
    type: 'application/json'
}));
app.use((req, res, next) => {
   /* res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');*/
    //Se agregó esta linea para que el servidor acepte cabeceras personalizadas y poder mandar x-access-token con el token
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token,Authorization");
    next();
});

app.get('/test', (req, res)=>{
    res.status(500).send({msg:"it works!"})
    
});


app.use('/Producto', mantenimientoProducto);
app.use('/Imagen', mantenimientoImagen);
app.use('/Usuario', mantenimientoUsuario);
app.use('/Venta', mantenimientoVenta);
app.use('/Detalleventa', mantenimientoDetalleVenta);
app.use('/Conversion', mantenimientoConversion);
app.use('/Valoracion', mantenimientoValoracion);
app.use('/Categoria' , mantenimientoCategoria);

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API MarketPlace",
        version: "0.1.0",
        description:
          "API MarketPlace documentacion",
        
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./controllers/producto/ProductoController.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

app.listen(PORT,() => {
    console.log('server running');
});