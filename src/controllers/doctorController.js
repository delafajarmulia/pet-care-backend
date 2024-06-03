const express = require("express")
const response = require("../response")
const { getAllDoctor, getDoctorById, createDoctor, updateDoctor } = require("../repository/doctorRepository")

const router = express.Router()

router.get("/", async(req, res) => {
    const doctors = await getAllDoctor()

    if(doctors.length < 1){
        response(404, doctors, 'doctor unavailable', res)
    }else{
        response(200, doctors, 'get all doctor', res)
    }
})

router.get("/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    const doctor = await getDoctorById(id)

    if(doctor == null) response(404, doctor, `doctor with id ${id} unavailable`, res)

    response(200, doctor, `get doctor data with id ${id}`, res)
})

router.post("/", async(req, res) => {
    try {
        const newDoctor = req.body
        if(newDoctor.name.trim().length === 0 | newDoctor.specialis.trim().length === 0){
            response(400, newDoctor, 'some fields are missing', res)
        }

        const doctor = await createDoctor(newDoctor)
        response(200, doctor, 'successfully add new doctor', res)
    } catch (e) {
        response(400, e.message, 'internal server error', res)
    }
})

router.put("/:id", async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const newDataDoctor = req.body

        const findDoctor = await getDoctorById(id)
        if(!findDoctor) response(404, findDoctor, `doctor with id ${id} unavailable`, res)

        const doctor = await updateDoctor(id, newDataDoctor)
        response(200, doctor, `successfully update doctor with id ${id}`, res)
    } catch (e) {
        response(400, e.message, 'internal server error', res)
    }
})

module.exports = router