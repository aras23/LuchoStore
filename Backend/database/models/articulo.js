const mongoose = require('mongoose');
const Categoria = require("./categoria");
const articuloSchema = new mongoose.Schema({
    
    nombreProducto: { type: String},
    descripcion: { type: String },
    precio: { type: Number},
    cantidad: { type: Number},
    imagen: { type: String},
    categoriaID: { type: mongoose.ObjectId, ref: Categoria }
})
const Articulo = mongoose.model('articulo', articuloSchema);
module.exports = Articulo;