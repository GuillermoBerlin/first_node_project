const mongoose = require("../config/mongodb");

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users" // Referencia al modelo de usuarios
    },
    products: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "products" // Referencia al modelo de productos
        },
        quantity: {
            type: Number,
            default: 1 // Valor predeterminado para la cantidad del producto en el carrito
        }
    }]
});

module.exports = mongoose.model("carts", cartSchema);
