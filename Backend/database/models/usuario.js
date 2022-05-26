const mongoose = require('mongoose');
const Rol = require("./rol");
const usuarioSchema = new mongoose.Schema({
    
    nombreUsuario: { type: String},
    apellido: { type: String},
    tipoDocumento: { type: String},
    direcion: { type: String},
    telefono: { type: Number},
    clave: { type: String},
    estado: { type: Number},
    rolID: { type: mongoose.ObjectId, ref: Rol }
})
const Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = Usuario;