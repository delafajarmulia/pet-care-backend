const express = require("express")
const response = require("../response")
const { getAllDoctor, getDoctorById, createDoctor, updateDoctor, getDoctorByNameAndSpecialis } = require("../repository/doctorRepository")
const authenticatedToken = require("../middleware/authenticatedToken")
const postUpdateDoctorValidation = require("../validator/doctorValidation")
const { isAdmin } = require("../middleware/checkedRole")
const { validationResult } = require("express-validator")

const router = express.Router()

router.get("/", authenticatedToken, async(req, res) => {
    try {
        const doctors = await getAllDoctor()
    
        if(doctors.length < 1){
            return response(404, doctors, 'doctor unavailable', res)
        }else{
            response(200, doctors, 'get all doctor', res)
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    const doctor = await getDoctorById(id)

    if(!doctor) return response(404, doctor, `doctor with id ${id} unavailable`, res)

    response(200, doctor, `get doctor data with id ${id}`, res)
})

router.post("/", authenticatedToken, isAdmin, postUpdateDoctorValidation, async(req, res) => {
    try {
        const newDoctor = req.body
        // if(newDoctor.name.trim().length === 0 | newDoctor.specialis.trim().length === 0){
        //     response(400, newDoctor, 'some fields are missing', res)
        // }
        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success: false,
                message: 'error validation',
                errors: errorCheckValidation.array()
            })
        }

        const doctorAvailable = await getDoctorByNameAndSpecialis(newDoctor)
        if(doctorAvailable) return response(400, doctorAvailable, 'doctor data is available', res)

        const doctor = await createDoctor(newDoctor)
        response(200, doctor, 'successfully add new doctor', res)
    } catch (e) {
        response(400, e.message, 'internal server error', res)
    }
})

router.put("/:id", authenticatedToken, isAdmin, postUpdateDoctorValidation, async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const newDataDoctor = req.body

        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success: false,
                message:'error validation',
                errors: errorCheckValidation.array()
            })
        }

        const findDoctor = await getDoctorById(id)
        if(!findDoctor) response(404, findDoctor, `doctor with id ${id} unavailable`, res)

        const doctorDataAvailabled = await getDoctorByNameAndSpecialis(newDataDoctor)
        if(doctorDataAvailabled) return response(400, doctorDataAvailabled, 'doctor data is available', res)

        const doctor = await updateDoctor(id, newDataDoctor)
        response(200, doctor, `successfully update doctor with id ${id}`, res)
    } catch (e) {
        response(500, e.message, 'internal server error', res)
    }
})

module.exports = router