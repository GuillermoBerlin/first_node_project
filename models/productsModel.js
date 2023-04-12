const mongoose = require("../config/mongodb")


const productSchema = mongoose.Schema({
    isNew: {
        type: Boolean,
        default: false
    },
    name:{
        type:String,
        
         },
    price:Number,
    description:String,
    descriptionLong:String,
    category:{
        type: mongoose.Schema.ObjectId,
        ref:"categories"
        },
    thumbnail:{
        type:String,
        },
    thumbnail2:{
        type:String,
        },     
})
module.exports = mongoose.model("products", productSchema)