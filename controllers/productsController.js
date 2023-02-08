const productsModel = require("../models/productsModel")
module.exports={
    getAll: function(req, res, next){
        console.log(req.query)
        const productos = [
            {
                id: 1,
                name:"Moto G",
                price:100
            },
            {
                id:2,
                name:"moto x",
                price:200
            }
        ]
        res.status(200).json(productos)
    },

    getCategories:function(req,res,next){
        res.send("responf with a resource products");
    },
    getById: function(req, res, next){
        console.log(req.params.id)
        const producto =
        {
            id:1,
            name:"moto g",
            price:100

        }
        res.status(200).json(producto)
    },
    create: function(req, res, next){
        console.log(req.body)
        res.status(201).json(req.body)
    },
    update: function(req, res, next){
        console.log(req.body)
        res.status(201).json(req.body)
    },
    delete: function(req,res,next){
        console.log(req.params.id)
        const producto =
        {
            id: 1,
            name: "moto g",
            price:100
        }
    }
} 