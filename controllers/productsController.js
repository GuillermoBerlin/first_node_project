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
                isNew:req.body.isNew,
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                descriptionLong:req.body.descriptionLong,
                category:req.body.category,
                thumbnail:req.body.thumbnail,
                thumbnail2:req.body.thumbnail2,
                
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
    },

    getByCategory: async function(req, res, next) {
        try {
            const categoryId = req.params.categoryId; 
            const products = await productsModel.find({ category: categoryId }).populate("category");
            
            res.status(200).json(products);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error al obtener productos por categoría" });
        }
    }
} 