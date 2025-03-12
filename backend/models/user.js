const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password (to be implemented later)
  provider: { type: String, default: "Email" }, // Default provider is email
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
