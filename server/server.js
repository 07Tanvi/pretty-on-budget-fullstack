const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "../public")));


// ✅ MongoDB CONNECT (FINAL)
mongoose.connect("mongodb+srv://tanvi:tanvi0708@cluster0.bsmn5dd.mongodb.net/beautyDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error ❌", err));


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

    let plan = await Plan.findOne({ skin });

    if (!plan) {
      const defaultPlan = products[skin] || products["Oily"];

      plan = new Plan({
        skin,
        morning: defaultPlan.morning,
        night: defaultPlan.night
      });

      await plan.save();
    }

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