const express = require("express")
const response = require("../response")
const authenticatedToken = require("../middleware/authenticatedToken")
const { getAllClinic, getClinicById, createClinic } = require("../repository/clinicRepository")
const { isAdmin, isOwner } = require("../middleware/checkedRole")
const numericValidation = require("../validator/numericValidation")
const { validationResult } = require("express-validator")
const { clinicValidation } = require("../validator/clinicValidation")
const { getPetById } = require("../repository/petRepository")

const router = express.Router()

router.get("/", authenticatedToken, isAdmin, async(req, res) => {
    try {
        const clinics = await getAllClinic()

        if(clinics.length < 1) return response(404, clinics, 'clinics are not available', res)

        return response(200, clinics, 'get all clinics', res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/:id", authenticatedToken, numericValidation, async(req, res) => {
    try {
        const id = parseInt(req.params.id)

        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success:false,
                message:'error validation',
                errors: errorCheckValidation.array()
            })
        }

        const clinic = await getClinicById(id)
        if(!clinic) return response(404, clinic, `clinic with id ${id} not found`, res)

        return response(200, clinic, `get clinic by id ${id}`, res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.post("/", authenticatedToken, isOwner, clinicValidation, async(req, res) => {
    try {
        // datenya harus gmt+7
        const newClinicData = req.body

        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success:false,
                message:'error validation',
                errors: errorCheckValidation.array()
            })
        }

        const petAvailabled = await getPetById(newClinicData.petId)
        if(!petAvailabled) return response(404, petAvailabled, `cant find pet with id ${newClinicData.petId}`, res)

        const doctorAvailabled = await getPetById(newClinicData.doctorId)
        if(!doctorAvailabled) return response(404, doctorAvailabled, `cant find pet with id ${newClinicData.doctorId}`, res)

        const newClinic = await createClinic(newClinicData)
        return response(200, newClinic, 'successfully add new clinic data', res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router