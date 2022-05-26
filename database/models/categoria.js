const mongoose = require('mongoose');
const categoriaSchema = new mongoose.Schema({
    
    nombreCategoria: { type: String},
})
const Categoria = mongoose.model('categoria', categoriaSchema);
module.exports = Categoria;