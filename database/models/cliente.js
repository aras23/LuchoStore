const mongoose = require('mongoose');
const clienteSchema = new mongoose.Schema({
    
    nombreCliente: { type: String},
    apellido: { type: String},
    tipoDocumento: { type: String},
    numeroDocumento: { type: Number},
    direcion: { type: String},
    telefono: { type: Number},
    email: { type: String}

})
const Cliente = mongoose.model('cliente', clienteSchema);
module.exports = Cliente;