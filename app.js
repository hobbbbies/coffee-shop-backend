// app.js
require('dotenv').config(); // Load environment variables FIRST
const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const stripeRouter = require("./routes/stripeRouter");
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
)

app.use("/", stripeRouter);  

app.listen(PORT, () => {
    console.log("Listening on ", PORT);
})