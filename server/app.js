const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "Server running ✅" });
});

// example API route
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 25000 },
    { id: 2, name: "Headphones", price: 1200 },
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));