const productsModel = require("../models/productsModel")
module.exports={
    getAll: async function(req, res, next){
        try{
            const products = await productsModel.find()
            res.status(200).json(products)
        }catch(e){
            console.log(e)
        }
        
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
    create: async function(req, res, next){
        try{
            const producto = new productsModel({
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                quantity:req.body.quantity,
            })
            const document = await producto.save()
            console.log(req.body)
            res.status(201).json(document)
        }catch(e){
            console.log(e)
        }

        
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