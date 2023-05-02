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
            default: 1
        }
    }]
});

module.exports = mongoose.model("carts", cartSchema);

