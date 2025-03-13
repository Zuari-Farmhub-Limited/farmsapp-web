const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" })); // Allow all origins (change for security)

app.get("/kisaan/companion/v1/products", (req, res) => {
    res.json([
        { name: "Organic Fertilizer", price: 500 },
        { name: "Hybrid Seeds", price: 300 }
    ]);
});

app.listen(3000, () => console.log("Server running on port 3000"));
