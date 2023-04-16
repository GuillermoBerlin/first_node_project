const mongoose = require("../config/mongodb")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        
         },
    email:{
        type: String,
        unique: true,
        },
    password:String,
    
})

userSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next()
})
module.exports = mongoose.model("users", userSchema)