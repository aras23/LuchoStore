const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const Rol = require('./database/models/rol');
const Usuario = require('./database/models/usuario');
const Articulo = require('./database/models/articulo');
const Categoria = require('./database/models/categoria');
const Cliente = require('./database/models/cliente');
const Detalle_venta = require('./database/models/detalle_venta');
const Venta = require('./database/models/venta');


// configuracion cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// creacion de rol modo test
app.use(express.json());
const rol = new Rol({
    nombreRol: 'Aministrador',
    descripcion: 'Control total',
    estado: 1
    
});
rol.save();
// crud de rol ----------------------------------------------------------------
app.get('/getRol', (req, res) => {
    Rol.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
app.post('/postRol', (req, res) => {
    Rol.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})
//Actualizar Rol
app.put('/putRol/:id', (req, res) => {
    Rol.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                nombreRol: req.body.nombreRol,
                descripcion: req.body.descripcion,
                estado: req.body.estado
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))

})
//Eliminar Rol
app.delete('/deleteRol/:id', (req, res) => {
    Rol.deleteOne(
        { _id: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})
// END DECRUD DE ROL -------------------------------------------------------------
// creacion de usuario modo test
app.use(express.json());
const usuario = new Usuario({
    nombreUsuario: 'Carlos',
    apellido: 'Montaño',
    tipoDocumento: 'Cedula',
    direcion: 'Av.las lomas',
    telefono: 7451210,
    clave: 'admin',
    estado: 1
});
usuario.save();
// CRUD DE USUARIO ------------------------------------------------------------
app.get('/getUsuario', (req, res) => {
    Usuario.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
app.post('/postUsuario', (req, res) => {
    Usuario.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})
//Actualizar Usuario
app.put('/putUsuario/:id', (req, res) => {
    Usuario.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                nombreUsuario: req.body.nombreUsuario,
                apellido: req.body.apellido,
                direcion: req.body.direcion,
                telefono: req.body.telefono,
                clave: req.body.clave,
                estado: req.body.estado,
                rolID: req.body.rolID
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))
})
//Eliminar usuario
app.delete('/deleteUsuario/:id', (req, res) => {
    Usuario.deleteOne(
        { _id: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

// END DE CRUD DE USUARIO ------------------------------------------------------------
// creacion de Articulo modo test
app.use(express.json());
const articulo = new Articulo({

    nombreProducto: 'Pepsi',
    descripcion: 'de 3 litros',
    precio: 20,
    cantidad: 10,
    imagen: 'asd'
});
articulo.save();

// crud Productos
app.get('/getProducto', (req, res) => {
    Articulo.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})

app.post('/postProducto', (req, res) => {
    Articulo.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

app.put('/putProducto/:id', (req, res) => {
    Articulo.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                nombreProducto: req.body.nombreProducto,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                imagen: req.body.imagen,
                categoriaID: req.body.categoriaID
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
    .catch(error => console.error(error))
})

app.delete('/deleteProducto/:id', (req, res) => {
    Articulo.deleteOne(
        { _id: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})
// end

// creacion de categoria modo test
const categoria = new Categoria({

    nombreCategoria: 'Gaseosa'
    
});
categoria.save();
// ----------------CRUD CATEGORIA--------------------
app.get('/getCategoria', (req, res) => {
    Categoria.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
app.post('/postCategoria', (req, res) => {
    Categoria.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

app.put('/putCategoria/:id', (req, res) => {
    Categoria.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                nombreCategoria: req.body.nombreCategoria,
                descripcion: req.body.descripcion,
                estado: req.body.estado,
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
    .catch(error => console.error(error))
})

app.delete('/deleteCategoria/:id', (req, res) => {
    Categoria.deleteOne(
        { _id: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})
// ---------------- END CATEGORIA ------------------

// creacion de Cliente modo test
app.use(express.json());
const cliente = new Cliente({
    nombreCliente: 'Roly',
    apellido: 'Menesez',
    tipoDocumento: 'Cedula',
    numeroDocumento: 4101200,
    direcion: 'Av. Petrolera',
    telefono: 7451210,
    email:'roly_01@hotmail.com'
});
cliente.save();

app.get('/getCliente', (req, res) => {
    Cliente.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})

// end

// creacion de Detalle_venta modo test ------------------
app.use(express.json());
const detalle_venta = new Detalle_venta({
    nombreCliente: 'Coca Cola',
    cantidad: 2,
    precio: '8',
    descuento: 1
});
detalle_venta.save();
// ---------------------CRUD DetalleVenta-----------------------
app.get('/getDetalleVenta', (req, res) => {
    Detalle_venta.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
app.post('/postDetalleVenta', (req, res) => {
    Detalle_venta.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

app.put('/putDetalleVenta/:id', (req, res) => {
    Detalle_venta.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                descuento: req.body.descuento,
                articuloID: req.body.articuloID,
                ventaID: req.body.ventaID
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
    .catch(error => console.error(error))
})

app.delete('/deleteDetalleVenta/:id', (req, res) => {
    Detalle_venta.deleteOne(
        { _id: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})
// ---------------------END CRUD DetalleVenta-----------------------

// creacion de venta modo test
app.use(express.json());
const venta = new Venta({

    numeroComprobante: 2100,
    tipoComprobante: 'Pasaporte',
    fecha: 20-05-2021,
    total: 10,
    estado: 1
});
venta.save();

// ---------------------CRUD Venta-----------------------
app.get('/getVenta', (req, res) => {
    Venta.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
app.post('/postVenta', (req, res) => {
    Venta.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

app.put('/putVenta/:id', (req, res) => {
    Venta.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                tipoComprobante: req.body.tipoComprobante,
                serieComprobante: req.body.serieComprobante,
                numeroComprobante: req.body.numeroComprobante,
                fecha: req.body.fecha,
                total: req.body.total,
                estado: req.body.estado,
                clienteID: req.body.clienteID,
                usuarioID: req.body.usuarioID
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
    .catch(error => console.error(error))
})

app.delete('/deleteVenta/:id', (req, res) => {
    Venta.deleteOne(
        { _id: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})
// ---------------------END CRUD Venta-----------------------

app.listen( 3000, () => {
    console.log('iniciando server en puerto 3000');
});