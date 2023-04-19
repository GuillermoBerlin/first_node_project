const mongoose = require("../config/mongodb");

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users" // Referencia al modelo de usuarios
    },
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: "products" // Referencia al modelo de productos
    }]
});

module.exports = mongoose.model("carts", cartSchema);

