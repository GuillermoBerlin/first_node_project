const mongoose = require("../config/mongodb");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

//Checks if theres already an user with that email

userSchema.pre("save", async function (next) {
  try {
    const existingUser = await this.model("users").findOne({ email: this.email });
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("users", userSchema);
