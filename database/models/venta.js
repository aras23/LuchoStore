const mongoose = require('mongoose');
const Cliente = require("./cliente");
const Usuario = require("./usuario");
const ventaSchema = new mongoose.Schema({
    
    numeroComprobante: { type: Number},
    tipoComprobante: { type: String },
    fecha: { type: Date},
    total: { type: Number},
    estado: { type: Number},
    
    clienteID: { type: mongoose.ObjectId, ref: Cliente },
    usuarioID: { type: mongoose.ObjectId, ref: Usuario }
})
const Venta = mongoose.model('venta', ventaSchema);
module.exports = Venta;