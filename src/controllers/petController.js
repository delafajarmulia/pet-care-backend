const express = require("express")
const response  = require("../response")
const authenticatedToken = require("../middleware/authenticatedToken")
const { getAllPet, createPet, getPetById, getPetByName, updatePet } = require("../repository/petRepository")
const { petValidation } = require("../validator/petValidation")
const { validationResult } = require("express-validator")
const { isAdmin, isOwner } = require("../middleware/checkedRole")
const numericValidation = require("../validator/numericValidation")
const { getUserById } = require("../repository/userRepository")
const { getCategoryById } = require("../repository/categoryRepository")

const router = express.Router()

router.get("/", authenticatedToken, async(req, res) => {
    try {
        const pets = await getAllPet()

        if(pets.length < 1) return response(404, pets, 'there are no pets in the database yet', res)
        
        return response(200, pets, 'get all pet', res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/:id", authenticatedToken, isOwner, numericValidation, async(req, res) => {
    try {
        const id = parseInt(req.params.id)

        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success:false,
                message:'error validation',
                errors:errorCheckValidation.array()
            })
        }

        const pet = await getPetById(id)
        if(!pet) return res.status(404).send(`cant find pet with id ${id}`)
        return response(200, pet, `get pet by id ${id}`, res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/search/:name", authenticatedToken, isAdmin, async(req, res) => {
    try {
        const name = req.params.name
        
        if(!name){
            return res.status(422).json({
                success:false,
                message: 'error validation',
                errors: 'name must is required'
            })
        }

        const pets = await getPetByName(name.toLowerCase())
        if(pets.length < 1){
            return res.status(404).json({
                success:false,
                message:`pets with name ${name} are not available`
            })
        }

        return response(200, pets, `find pets with name ${name}`, res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.post("/", authenticatedToken, petValidation, async(req, res) => {
    try {
        const petData = req.body

        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success: false,
                message: 'error validation',
                errors: errorCheckValidation.array()
            })
        }

        
        const newPet = await createPet(petData)
        return response(200, newPet, 'successfully add new pet', res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.put("/:id", authenticatedToken, numericValidation, petValidation, async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const updatedData = req.body
        
        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success: false,
                message: 'error validation',
                errors: errorCheckValidation.array()
            })
        } 
        
        const petAvailabled = await getPetById(id)
        if(!petAvailabled) return res.status(404).send(`cant find pet with id ${id}`)
            
        const ownerAvailabled = await getUserById(updatedData.userId)
        if(!ownerAvailabled){
            return res.status(404).json({
                success:false,
                message:`cant find user with id ${updatedData.userId}`
            })
        }
        
        const categoryAvailabled = await getCategoryById(updatedData.categoryId)
        if(!categoryAvailabled){
            return res.status(404).json({
                success:false,
                message:`cant find category with id ${updatedData.userId}`
            })
        }

        const updatedPet = await updatePet(id, updatedData)
        return response(200, updatedPet, `successfully update pet with id ${id}`, res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router