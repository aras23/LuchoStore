const mongoose = require('mongoose');
const categoriaSchema = new mongoose.Schema({
    
    nombreCategoria: { type: String},
    descripcion: { type: String },
    estado: { type: Boolean},
})
const Categoria = mongoose.model('categoria', categoriaSchema);
module.exports = Categoria;