const express = require("express")
const { getAllOwner, getOwnerById, getOwnerByEmail, createOwner, deleteOwner } = require("../repository/owner")
const response = require("../response")
const authenticatedToken = require("../middleware/authenticatedToken")

const router = express.Router()

router.get("/", authenticatedToken, async(req, res) => {
    const owners = await getAllOwner()
    
    if(!owners){
        response(404, owners, "owner not available", res)
    }else{
        response(200, owners, "get all owner data", res)
    }
})

router.get("/:id", async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(typeof id !== "number") {
            return response(400, id, "id must be a number", res)
        } else{
            const owner = await getOwnerById(id)

            if(owner.length < 1){
                response(404, owner, "owner not found", res)
            }
            response(200, owner, `get owner by id ${id}`, res)
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/:id", async(req, res) => {
    const id = parseInt(req.params.id)

    if(typeof id !== 'number'){
        response(400, id, `id must be a number`, res)
    }
    
    const cekOwner = await getOwnerById(id)

    if(cekOwner.length < 1){
        const owner = await deleteOwner(id)
        response(201, owner, `successfully delete owner with id ${id}`, res)
    }
})

module.exports = router