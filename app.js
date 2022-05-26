const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

var bodyParser = require('body-parser');

const Rol = require('./database/models/rol');
const Usuario = require('./database/models/usuario');
const Articulo = require('./database/models/articulo');
const Categoria = require('./database/models/categoria');
const Cliente = require('./database/models/cliente');
const Detalle_venta = require('./database/models/detalle_venta');
const Venta = require('./database/models/venta');

const { Schema } = require('./database/mongoose');
const { path } = require('express/lib/application');

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
//Mostrar rol
rol.save();
app.get('/getRol', (req, res) => {
    Rol.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
//Registrar rol
app.post('/postRol', (req, res) => {
    Rol.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})
//Actualizar Rol
app.put('/putRol/:id', (req, res) => {
    Rol.findOneAndUpdate(
        { nombreRol: req.params.id },
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
        { nombreRol: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})



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
//Registrar Usuario
usuario.save();
app.get('/getUsuario', (req, res) => {
    Usuario.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
//Mostar usuario
app.post('/usuario', (req, res) => {
    Usuario.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})
//Actualizar Usuario
app.put('/usuario/:id', (req, res) => {
    Usuario.findOneAndUpdate(
        { nombreUsuario: req.params.id },
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
app.delete('/usuario/:id', (req, res) => {
    Usuario.deleteOne(
        { nombre: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

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
app.get('/getArticulo', (req, res) => {
    Articulo.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})

// creacion de categoria modo test
const categoria = new Categoria({

    nombreCategoria: 'Gaseosa'
    
});
//Mostrar Categoria
categoria.save();
app.get('/getCategoria', (req, res) => {
    Categoria.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
//Registrar Categoria
app.post('/categoria', (req, res) => {
    Categoria.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})
//Actualizar Categoria
app.put('/categoria/:id', (req, res) => {
    Categoria.findOneAndUpdate(
        { nombreCategoria: req.params.id },
        {
            $set: {
                nombreCategoria: req.body.nombreCategoria,
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))
})
//Eliminar Categoria
app.delete('/categoria/:id', (req, res) => {
    Usuario.deleteOne(
        { nombreCategoria: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

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

//Mostrar Cliente
cliente.save();
app.get('/getCliente', (req, res) => {
    Cliente.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
//Registrar Cliente
app.post('/cliente', (req, res) => {
    Cliente.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})

//Actualizar Cliente
app.put('/cliente/:id', (req, res) => {
    Cliente.findOneAndUpdate(
        { nombreCliente: req.params.id },
        {
            $set: {
                nombreCliente: req.body.nombre,
                apellido: req.body.apellido,
                tipoDocumento: req.body.tipoDocumento,
                numeroDocumento: req.body.numeroDocumento,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email  
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))
})
//Eliminar Cliente
app.delete('/cliente/:id', (req, res) => {
    Cliente.deleteOne(
        { nombreCliente: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})


// creacion de Detalle_venta modo test
app.use(express.json());
const detalle_venta = new Detalle_venta({
    nombreCliente: 'Coca Cola',
    cantidad: 2,
    precio: '8',
    descuento: 1
});
//Mostrar detalle venta
detalle_venta.save();
app.get('/getDetalle_venta', (req, res) => {
    Detalle_venta.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
//Registrar detalle venta
app.post('/detalle_venta', (req, res) => {
    Detalle_venta.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})
//Actualizar Detalle venta
app.put('/detalle_venta/:id', (req, res) => {
    Detalle_venta.findOneAndUpdate(
        { titulo: req.params.id },
        {
            $set: {
                nombreProducto: req.body.nombreProducto,
                cantidad: req.body.cantidad,
                descripcion: req.body.descripcion,
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
//Eliminar Detalle venta
app.delete('/detalle_venta/:id', (req, res) => {
    Detalle_venta.deleteOne(
        { _id: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})


// creacion de venta modo test
app.use(express.json());
const venta = new Venta({

    numeroComprobante: 2100,
    tipoComprobante: 'Pasaporte',
    fecha: 20-05-2021,
    total: 10,
    estado: 1
});
//Mostrar Venta
venta.save();
app.get('/getVenta', (req, res) => {
    Venta.find({})
        .then((list) => {res.send(list); console.log(list)})
        .then((error) => {console.log(error)});
})
//Registrar  Venta
app.post('/venta', (req, res) => {
    Venta.create(req.body)
        .then((result) => { res.send(result); res.json("success")})
        .catch(error => console.error(error))
})
//Actualizaar Venta
app.put('/venta/:id', (req, res) => {
    Venta.findOneAndUpdate(
        { nombre_Producto: req.params.id },
        {
            $set: {
                nombreProducto: req.body.nombreProducto,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                descuento: req.body.descuento
            }
        },
        {
            upsert: true
        }
    ).then((result) => {res.json('Updated') })
        .catch(error => console.error(error))

})
//Eliminar venta
app.delete('/venta/:id', (req, res) => {
    Venta.deleteOne(
        { nombre: req.params.id }
    )
        .then((result) => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

app.listen( 3000, () => {
    console.log('iniciando server en puerto 3000');
});