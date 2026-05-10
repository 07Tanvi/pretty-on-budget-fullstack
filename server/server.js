const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "../public")));


// ✅ MongoDB CONNECT (FINAL)
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/beautyDb")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));


// ✅ Schema
const planSchema = new mongoose.Schema({
  skin: String,
  morning: Array,
  night: Array
});

const Plan = mongoose.model("Plan", planSchema);


// ✅ Default products
const products = {
  Oily: {
    morning: [
      "Simple Face Wash (₹245)",
      "Pond's Gel (₹150)",
      "Lakme SPF 50 (₹220)"
    ],
    night: [
      "Simple Face Wash (₹245)",
      "Salicylic Serum",
      "Pond's Gel (₹150)"
    ]
  }
};


// ✅ API
app.post("/get-plan", async (req, res) => {
  try {
    const { skin } = req.body;

    const plan = products[skin] || products["Oily"];

    // 👉 SAVE IN DATABASE
    const newPlan = new Plan({
      skin: skin,
      morning: plan.morning,
      night: plan.night
    });

    await newPlan.save();

    res.json({ plan });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});