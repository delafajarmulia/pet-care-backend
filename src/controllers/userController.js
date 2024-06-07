const express = require("express")
const { getAllUser, getUserById, deleteUser } = require("../repository/userRepository")
const response = require("../response")
const authenticatedToken = require("../middleware/authenticatedToken")
const { isAdmin } = require("../middleware/checkedRole")

const router = express.Router()

router.get("/", authenticatedToken, isAdmin, async(req, res) => {
    try {
        const users = await getAllUser()
        
        if(users.length < 1){
            return response(404, users, "owner not available", res)
        }else{
            return response(200, users, "get all owner data", res)
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/:id", authenticatedToken, async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(typeof id !== "number") {
            return response(400, id, "id must be a number", res)
        } else{
            const user = await getUserById(id)

            if(!user){
                return response(404, user, "user not found", res)
            }
            return response(200, user, `get user by id ${id}`, res)
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/:id", authenticatedToken, async(req, res) => {
    const id = parseInt(req.params.id)

    if(typeof id !== 'number'){
        return response(400, id, `id must be a number`, res)
    }
    
    const cekUser = await getUserById(id)
    if(!cekUser){
        return res.status(404).json({
            status:'not found',
            message:`cant found user with id ${id}`
        })
    }
    const deletedUser = await deleteUser(cekUser.id)
    deleteUser 
        ? res.status(200).json({
            status: 'ok',
            message:`successfully delete user data with id ${id}`
        })
        : res.status(400).json({
            status:'failed',
            message: `failed delete user with id ${id}`
        })
})

module.exports = router