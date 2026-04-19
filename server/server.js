const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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
  },
  Dry: {
    morning: [
      "Cetaphil Cleanser",
      "Moisturizer",
      "Sunscreen"
    ],
    night: [
      "Cleanser",
      "Hyaluronic Serum",
      "Moisturizer"
    ]
  }
};

app.post("/get-plan", (req, res) => {
  try {
    const { skin } = req.body;

    const plan = products[skin];

    if (!plan) {
      return res.status(400).json({ error: "Invalid skin type" });
    }

    res.json({ plan });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});