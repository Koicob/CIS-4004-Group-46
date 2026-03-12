const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/knightSwap")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

app.get("/", (req, res) => {
    res.send("Knight Swap API Running");
});


app.get("/test", (req, res) => {
    res.json({ message: "Server is working correctly" });
});


app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

const User = require("./models/user");
const Item = require("./models/item");
const Tag = require("./models/tag");
const Location = require("./models/location");