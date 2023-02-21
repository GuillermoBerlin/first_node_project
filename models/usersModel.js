const mongoose = require("../config/mongodb")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        unique:true,
         },
    email:{
        type: String,
        unique: true,
        },
    password:String,
    
})
module.exports = mongoose.model("users", productSchema)