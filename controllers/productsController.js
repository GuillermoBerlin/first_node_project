const productsModel = require("../models/productsModel")
module.exports={

    getAll: async function(req, res, next){
        try{
            const products = await productsModel.find().populate("category")
            res.status(200).json(products)
        }catch(e){
            console.log(e)
        }
        
    },

    getCategories:function(req,res,next){
        res.send("responf with a resource products");
    },

    getById: async function(req, res, next){
        console.log(req.params.id)
        try{
            const product = await productsModel.findById(req.params.id)
            res.status(200).json(product)
        }catch(e){
            console.log(e)
        }
        
    },

    create: async function(req, res, next){
        try{
            const producto = new productsModel({
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                quantity:req.body.quantity,
                category:req.body.category
            })
            const document = await producto.save()
            console.log(req.body)
            res.status(201).json(document)
        }catch(e){
            console.log(e)
        } 
    },

    update: async function(req, res, next){
        try{
            const document = await productsModel.updateOne({_id:req.params.id},req.body)
            res.status(200).json(document)
        }catch(e){
            console.log(e)
        }   
    },

    delete: async function(req,res,next){
        try{
            const document = await productsModel.deleteOne({_id:req.params.id})
            res.status(200).json(document)
        }catch(e){
            console.log(e)
        } 
    }
} 