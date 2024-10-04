const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Schemat dla User
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Funkcja do hashowania hasła przed zapisaniem
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Funkcja do porównania hasła
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Model dla User
const User = mongoose.model("User", userSchema);

module.exports = User;
