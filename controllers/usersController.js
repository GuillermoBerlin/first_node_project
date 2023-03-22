const usersModel = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports={

    create: async function(req, res, next){
        try{
            const user = new usersModel({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
            })
            const document = await user.save()
            res.status(201).json(document)
        }catch(e){
            console.log(e)
        } 
    },

    login: async function(req, res, next){
        try{
            const user = await usersModel.findOne({email:req.body.email})
            if(!user){
                res.json({message:"email incorrecto"})
                return
            }
            if(bcrypt.compareSync(req.body.password, user.password)){   
                const token = jwt.sign({userId:user._id},"node2022", {expiresIn:"1h"})         
            res.status(201).json(token)
            }else{
                res.json({message:"password incorrecto"})
            }
        }catch(e){
            console.log(e)
        } 
    },
} 