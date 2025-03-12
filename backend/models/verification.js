const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema({
  ghanaCardNumber: { type: String, required: true },
  verifiedName: { type: String, required: true },
  shortId: { type: String, required: true },
  userID: { type: String, required: true }, // Store User ID
  dateTime: { type: String, default: new Date().toLocaleString() },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Verification", VerificationSchema);
