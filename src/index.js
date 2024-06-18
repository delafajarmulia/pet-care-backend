const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")

dotenv.config()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world!")
})

const authController = require("./controllers/authController")
app.use('/auth', authController)

const userController = require("./controllers/userController")
app.use('/users', userController)

const categoryController = require("./controllers/categoryController")
app.use('/categories', categoryController)

const doctorController = require("./controllers/doctorController")
app.use('/doctors', doctorController)

const petController = require("./controllers/petController")
app.use('/pets', petController)

const clinicController = require("./controllers/clinicController")
app.use('/clinics', clinicController)


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})