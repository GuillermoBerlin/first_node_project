const cartModel = require("../models/cartModel");

module.exports = {

    getByUserId: async function(req, res, next) {
        try {
            const userId = req.params.userId;
            const cart = await cartModel.findOne({ user: userId }).populate("products").populate("products.product");
            res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al obtener el carrito del usuario" });
        }
    },

    addProduct: async function (req, res, next) {
        try {
            const userId = req.body.userId;
            const productId = req.body.productId;
            const cart = await cartModel.findOne({ user: userId });
            
            // Verificar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(product => product.product.toString() === productId);
            if (productIndex !== -1) {
                // Si el producto ya existe, aumentar la cantidad en 1
                cart.products[productIndex].quantity += 1;
            } else {
                // Si el producto no existe, agregarlo con cantidad 1
                cart.products.push({ product: productId, quantity: 1 });
            }
            
            await cart.save();
            res.status(200).json(cart);  
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al agregar producto al carrito" });
        }
    },
    

    removeProduct: async function(req, res, next) {
        try {
            const userId = req.body.userId; 
            const productId = req.body.productId; 
            const cart = await cartModel.findOneAndUpdate(
                { user: userId },
                { $pull: { products: { product: productId } } }, // Corrección: envolver productId en un objeto de consulta
                { new: true }
            );
            res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al eliminar el producto del carrito" });
        }
    },

    updateProductQuantity: async function(req, res, next) {
        try {
            const userId = req.body.userId;
            const productId = req.body.productId;
            const quantity = req.body.quantity;

            const cart = await cartModel.findOne({ user: userId });

            // Buscar el producto en el carrito
            const productIndex = cart.products.findIndex(product => product.product.toString() === productId);

            if (productIndex !== -1) {
                // Si el producto existe en el carrito, actualizar la cantidad
                cart.products[productIndex].quantity = quantity;
                await cart.save();
                res.status(200).json(cart);
            } else {
                // Si el producto no existe en el carrito, devolver un error
                res.status(404).json({ error: "El producto no está en el carrito" });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al actualizar la cantidad del producto en el carrito" });
        }
    }

    
};
