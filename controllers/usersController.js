const usersModel = require("../models/usersModel")
const cartModel = require("../models/cartModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports={
    
    
  create: async function (req, res, next) {
    try {
      const user = new usersModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const document = await user.save();

      // Crear un carrito para el usuario recién creado
      const cart = new cartModel({ user: document._id });
      await cart.save();

      res.status(201).json(document);
    } catch (e) {
      console.error(e);
      // Verificar si el error se debe a una restricción única en la base de datos
      if (e.message === "El email ya está registrado") {
        res.status(400).json({ message: "El email ya está registrado" });
      } else {
        res.status(500).json({ message: "Error al crear el usuario" });
      }
    }
  },

      login: async function(req, res, next){
        try{
            const user = await usersModel.findOne({email:req.body.email})
            if(!user){
                res.json({message:"Email incorrecto"})
                return
            }
            if(bcrypt.compareSync(req.body.password, user.password)){   
                const token = jwt.sign({userId:user._id},"node2022", {expiresIn:"1h"})
                const response = {
                    message:"Inicio de sesión exitoso",
                    token: token,
                    userId: user._id,
                    name: user.name
                };
                res.status(201).json(response);
            }else{
                res.json({message:"Contraseña incorrecta"})
            }
        }catch(e){
            console.log(e)
        } 
    }
    
}
