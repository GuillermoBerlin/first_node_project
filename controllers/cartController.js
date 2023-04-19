const cartModel = require("../models/cartModel");

module.exports = {

    getByUserId: async function(req, res, next) {
        try {
            const userId = req.params.userId;
            const cart = await cartModel.findOne({ user: userId }).populate("products");
            res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al obtener el carrito del usuario" });
        }
    },

    addProduct: async function(req, res, next) {
        try {
            const userId = req.body.userId; // Cambiado de req.params.userId a req.body.userId
            const productId = req.body.productId; // Cambiado de req.params.productId a req.body.productId

            // Verificar si el usuario ya tiene un carrito
            const existingCart = await cartModel.findOne({ user: userId });

            if (existingCart) {
                // Si el usuario ya tiene un carrito, simplemente agregamos el producto
                existingCart.products.push(productId);
                await existingCart.save();
                res.status(200).json(existingCart);
            } else {
                // Si el usuario no tiene un carrito, creamos uno nuevo
                const cart = new cartModel({
                    user: userId,
                    products: [productId]
                });
                await cart.save();
                res.status(200).json(cart);
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al agregar el producto al carrito" });
        }
    },

    removeProduct: async function(req, res, next) {
        try {
            const userId = req.body.userId; // Cambiado de req.params.userId a req.body.userId
            const productId = req.body.productId; // Cambiado de req.params.productId a req.body.productId
            const cart = await cartModel.findOneAndUpdate(
                { user: userId },
                { $pull: { products: productId } },
                { new: true }
            );
            res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al eliminar el producto del carrito" });
        }
    }
};
