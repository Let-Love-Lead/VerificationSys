const express = require("express");
const Verification = require("../models/verification");
const router = express.Router();

// Submit Verification Data
router.post("/", async (req, res) => {
    try {
      const { ghanaCardNumber, verifiedName, shortId, userID } = req.body;
  
      const newVerification = new Verification({
        ghanaCardNumber,
        verifiedName,
        shortId,
        userID,
        dateTime: new Date().toLocaleString(),
      });
  
      await newVerification.save();
      res.status(201).json({ message: "Verification saved successfully", newVerification });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  

// Get All Verification History
router.get("/", async (req, res) => {
    try {
      const history = await Verification.find().sort({ timestamp: -1 });
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  

module.exports = router;
