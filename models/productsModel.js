const mongoose = require("../config/mongodb")

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    quantity:Number
})
module.exports = mongoose.model("products", productSchema)