const express = require("express")
const dotenv = require("dotenv")
const app = express()

dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world!")
})

const ownerController = require("./controllers/owner")
app.use('/owners', ownerController)

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})