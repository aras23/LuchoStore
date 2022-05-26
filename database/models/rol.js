const mongoose = require('mongoose');
const rolSchema = new mongoose.Schema({
    
    nombreRol: { type: String},
    descripcion: { type: String},
    estado: { type: Number}
})
const Rol = mongoose.model('rol', rolSchema);
module.exports = Rol;