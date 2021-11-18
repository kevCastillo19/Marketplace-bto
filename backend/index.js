const express = require('express')
const bodyParser = require('body-parser')

const mantenimientoProducto = require('./controllers/producto/ProductoController')

const app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

app.use('/mantenimientoProd', mantenimientoProducto)

app.get('/', (req, res) => {
    console.log("object");
});


app.listen(3000,() => {
    console.log('server running');
});