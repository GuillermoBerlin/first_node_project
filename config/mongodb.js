const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost/27017", function(error){
    if(error){
        throw error
    }else{
        console.log("Connected to Mongo DB")
    }
})

module.exports = mongoose
