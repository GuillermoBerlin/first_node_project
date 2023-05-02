const cartModel = require("../models/cartModel");

module.exports = {

    getByUserId: async function(req, res, next) {
        try {
            const userId = req.params.userId;
            const cart = await cartModel.findOne({ user: userId }).populate("products.product");
            res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al obtener el carrito del usuario" });
        }
    },

    addProduct: async function(req, res, next) {
        try {
            const userId = req.body.userId; 
            const productId = req.body.productId; 

            // Verificar si el usuario ya tiene un carrito
            const existingCart = await cartModel.findOne({ user: userId });

            if (existingCart) {
                // Si el usuario ya tiene un carrito, simplemente agregamos el producto
                const updatedCart = await cartModel.findOneAndUpdate({user: userId}, {$push: {products: {product: productId}}}, {new: true});
                res.status(200).json(updatedCart);
            } else {
                // Si el usuario no tiene un carrito, creamos uno nuevo
                const cart = new cartModel({
                    user: userId,
                    products: [{product: productId}]
                });
                await cart.save();
                res.status(200).json(cart);
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al agregar el producto al carrito" });
        }
    },

    updateProduct: async function (req, res)  {
        try {
            const userId = req.body.userId; 
            const productId = req.body.productId;
            const quantity = req.body.quantity; 
            const cart = await cartModel.findOneAndUpdate(
                { user: userId, "products.product": productId },
                { $set: { "products.$.quantity": quantity } },
            );
            res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al actualizar el producto del carrito" });
        }
    },

    removeProduct: async function(req, res, next) {
        try {
            const userId = req.body.userId; 
            const productId = req.body.productId; 
            const cart = await cartModel.findOneAndUpdate(
                { user: userId },
                { $pull: { products: {product: productId} } },
                { new: true }
            );
            res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al eliminar el producto del carrito" });
        }
    }
};
