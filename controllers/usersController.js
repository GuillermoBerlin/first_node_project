const usersModel = require("../models/usersModel")
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
} 