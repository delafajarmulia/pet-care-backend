const express = require("express")
const dotenv = require("dotenv")
const app = express()

dotenv.config()
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world!")
})

const ownerController = require("./controllers/owner")
app.use('/owners', ownerController)

const categoryController = require("./controllers/category")
app.use('/categories', categoryController)

const doctorController = require("./controllers/doctor")
app.use('/doctors', doctorController)

const authController = require("./controllers/auth")
app.use('/auth', authController)

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})