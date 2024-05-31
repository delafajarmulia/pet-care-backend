const express = require("express")
const { getAllOwner, getOwnerById, getOwnerByEmail, createOwner, deleteOwner } = require("../repository/owner")
const response = require("../response")

const router = express.Router()

router.get("/", async(req, res) => {
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

router.post("/", async(req, res) => {
    try {
        const newOwner = req.body

        if(newOwner.name.trim().length === 0 || newOwner.email.trim().length === 0 || newOwner.address.trim().length === 0){
            response(400, newOwner, "some fields are missing", res)
        }

        const ownerAvailabled = await getOwnerByEmail(newOwner.email)
        if(ownerAvailabled.length > 1){
            console.log("ok")
            response(400, ownerAvailabled, 'email must be unique', res)
        }

        console.log("not available")
        const owner = await createOwner(newOwner)
        response(200, owner, "successfully add new owner", res)
    } catch (err) {
        res.statusCode(400).send("internal server error")
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