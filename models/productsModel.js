const mongoose = require("../config/mongodb")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        lowercase:true
         },
    price:Number,
    description:String,
    quantity:Number
})
module.exports = mongoose.model("products", productSchema)