const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/dn20223", function(error){
    if(error){
        throw error
    }else{
        console.log("conectado a mongo")
    }
})
module.exports = mongoose
