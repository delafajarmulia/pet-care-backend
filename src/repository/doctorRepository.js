const prisma = require("../db/index")

const getAllDoctor = async() => {
    const doctors = await prisma.doctor.findMany()
    return doctors
}

const getDoctorById = async(id) => {
    const doctor = await prisma.doctor.findUnique({
        where:{
            id: id,
        },
    })
    return doctor
}

const getDoctorByNameAndSpecialis = async(doctorData) => {
    const doctor = await prisma.doctor.findFirst({
        where:{
            name: doctorData.name,
            specialis: doctorData.specialis,
        },
    })
    return doctor
}

const createDoctor = async(newDoctor) => {
    const doctor = await prisma.doctor.create({
        data:{
            name:newDoctor.name,
            specialis: newDoctor.specialis,
        },
    })
    return doctor
}

const updateDoctor = async(id, newDataDoctor) => {
    const doctor = await prisma.doctor.update({
        data:{
            name: newDataDoctor.name,
            specialis: newDataDoctor.specialis,
        },
        where:{
            id: id
        },
    })
    return doctor
}

module.exports ={
    getAllDoctor,
    getDoctorById,
    getDoctorByNameAndSpecialis,
    createDoctor,
    updateDoctor
}