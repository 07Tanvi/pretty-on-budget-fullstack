const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running 💖");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
// PLAN GENERATE API
app.post("/get-plan", (req, res) => {

    const { skin, budget, issue } = req.body;

    let plan = {};

    if (skin === "Oily") {
        if (budget <= 500) {
            plan = {
                cleanser: "Simple Face Wash (₹245)",
                moisturizer: "Pond's Gel (₹150)",
                sunscreen: "Lakme SPF 50 (₹220)",
                treatment: "Salicylic Serum"
            };
        } else {
            plan = {
                cleanser: "Cetaphil Cleanser",
                moisturizer: "Neutrogena Hydro Boost",
                sunscreen: "Aqualogica Sunscreen",
                treatment: "Salicylic Serum"
            };
        }
    }

    if (skin === "Dry") {
        plan = {
            cleanser: "Cetaphil Gentle Cleanser",
            moisturizer: "Nivea Soft Cream",
            sunscreen: "Dr Sheth Sunscreen",
            treatment: "Hyaluronic Serum"
        };
    }

    res.json({
        message: "Plan generated 💖",
        plan: plan,
        issue: issue
    });

});