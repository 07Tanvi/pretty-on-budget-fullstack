const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* serve frontend */

app.use(express.static(path.join(__dirname, "../public")));

/* MongoDB connect */

mongoose.connect("mongodb://127.0.0.1:27017/beautyDb")

.then(() => {
  console.log("MongoDB Connected ✅");
})

.catch((err) => {
  console.log("MongoDB Error ❌", err);
});

/* schema */

const planSchema = new mongoose.Schema({

  skin: String,

  morning: Array,

  night: Array

});

const Plan = mongoose.model("Plan", planSchema);

/* skincare products */

const products = {

  Oily: {

    morning: [

      { name: "Pond's Gel", price: 150 },

      { name: "Simple Face Wash", price: 245 },

      { name: "Lakme SPF 50", price: 220 },

      { name: "Minimalist Sunscreen", price: 399 },

      { name: "Cetaphil Oily Cleanser", price: 499 }

    ],

    night: [

      { name: "Pond's Gel", price: 150 },

      { name: "Salicylic Serum", price: 399 },

      { name: "Niacinamide Serum", price: 549 },

      { name: "Simple Face Wash", price: 245 }

    ]
  },

  Dry: {

    morning: [

      { name: "Cetaphil Gentle Cleanser", price: 399 },

      { name: "Nivea Soft Moisturizer", price: 180 },

      { name: "Dot & Key Sunscreen", price: 445 },

      { name: "Hyaluronic Moisturizer", price: 599 }

    ],

    night: [

      { name: "Cetaphil Gentle Cleanser", price: 399 },

      { name: "Aloe Vera Gel", price: 120 },

      { name: "Hyaluronic Acid Serum", price: 499 },

      { name: "Nivea Soft Moisturizer", price: 180 }

    ]
  },

  Combination: {

    morning: [

      { name: "Simple Refresh Face Wash", price: 299 },

      { name: "Plum Green Tea Moisturizer", price: 399 },

      { name: "Lakme SPF 50", price: 220 },

      { name: "Minimalist Sunscreen", price: 399 }

    ],

    night: [

      { name: "Simple Refresh Face Wash", price: 299 },

      { name: "Vitamin C Serum", price: 549 },

      { name: "Plum Green Tea Moisturizer", price: 399 }

    ]
  },

  Sensitive: {

    morning: [

      { name: "Cetaphil Gentle Cleanser", price: 399 },

      { name: "Aveeno Moisturizer", price: 499 },

      { name: "Derma Co Sunscreen", price: 349 },

      { name: "Aloe Vera Gel", price: 120 }

    ],

    night: [

      { name: "Cetaphil Gentle Cleanser", price: 399 },

      { name: "Aloe Vera Gel", price: 120 },

      { name: "Barrier Repair Cream", price: 599 },

      { name: "Aveeno Moisturizer", price: 499 }

    ]
  }

};

/* API */

app.post("/get-plan", async (req, res) => {

  try {

    const { skin, budget } = req.body;

    const skincare = products[skin] || products["Oily"];

    /* budget filtering */

    const filteredMorning = skincare.morning.filter(
      item => item.price <= budget
    );

    const filteredNight = skincare.night.filter(
      item => item.price <= budget
    );

    const plan = {

      morning: filteredMorning,

      night: filteredNight
    };

    /* save in DB */

    const newPlan = new Plan({

      skin,

      morning: filteredMorning,

      night: filteredNight

    });

    await newPlan.save();

    res.json({ plan });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Server error"
    });
  }
});

/* server */

app.listen(5000, () => {

  console.log("Server running on port 5000");
});