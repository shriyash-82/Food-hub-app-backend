const express = require("express");
const app = express();
const mongodb = require("./db")
const createUser = require("./routes/createUser")
const userLogin = require("./routes/login")
const displayData = require("./routes/displayData")
const orderData = require("./routes/Orderdata")
const cors = require('cors')
const PORT = process.env.port || 5000
// implementing cors
 app.use( (req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
 })
// ---------------------------------------------------------------------------
mongodb()
app.use(cors())
app.use(express.json())
app.use("/api",createUser )
app.use("/api", userLogin)
app.use("/api", displayData)
app.use("/api", orderData)
app.listen(PORT, (req,res) => {
    console.log("server started")
})