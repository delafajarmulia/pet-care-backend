const express = require("express")
const { getAllOwner, getOwnerById } = require("../repository/owner")
const response = require("../response")

const router = express.Router()

router.get("/", async(req, res) => {
    const owners = await getAllOwner()
    
    if(!owners){
        response(404, owners, "user not available", res)
    }else{
        response(200, owners, "get all user data", res)
    }
})

router.get("/:id", async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(typeof id !== "number") res.send("id must be a number")
        const owner = await getOwnerById(id)
        response(200, owner, `get owner by id ${id}`, res)
    } catch (err) {
        res.status(404).send(err.message)
    }
})

module.exports = router