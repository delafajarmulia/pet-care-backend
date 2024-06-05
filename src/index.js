const express = require("express")
const dotenv = require("dotenv")
const app = express()

dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world!")
})

const userController = require("./controllers/userController")
app.use('/users', userController)

const categoryController = require("./controllers/categoryController")
app.use('/categories', categoryController)

const doctorController = require("./controllers/doctorController")
app.use('/doctors', doctorController)

const authController = require("./controllers/authController")
app.use('/auth', authController)

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})