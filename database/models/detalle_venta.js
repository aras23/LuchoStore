const mongoose = require('mongoose');
const Articulo = require("./articulo");
const Venta = require("./venta");
const detalle_ventaSchema = new mongoose.Schema({
    
    nombreProducto: { type: String},
    cantidad: { type: Number },
    precio: { type: Number},
    descuento: {type: Number},
    articuloID: { type: mongoose.ObjectId, ref: Articulo },
    ventaID: { type: mongoose.ObjectId, ref: Venta }
})
const Detalle_venta = mongoose.model('detalle_venta', detalle_ventaSchema);
module.exports = Detalle_venta;