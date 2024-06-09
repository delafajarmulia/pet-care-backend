const prisma = require("../db/index")

const getAllClinic = async() => {
    const clinics = await prisma.clinic.findMany()
    return clinics
}

const getClinicById = async(id) => {
    const clinic = await prisma.clinic.findFirst({
        where:{
            id:id
        },
    })
    return clinic
}

const createClinic = async(clinicData) => {
    const result = await prisma.clinic.create({
        data:{
            petId:clinicData.petId,
            doctorId:clinicData.doctorId,
            dateCheck:clinicData.dateCheck,
            billAmount:clinicData.billAmount,
            description:clinicData.description,
        },
    })
    return result
}

const updateClinic = async(id, clinicData) => {
    const result = await prisma.clinic.update({
        data:{
            petId:clinicData.petId,
            doctorId:clinicData.doctorId,
            dateCheck:clinicData.dateCheck,
            billAmount:clinicData.billAmount,
            description:clinicData.description,
        },
        where:{
            id:id,
        },
    })
    return result
}

module.exports = { getAllClinic, getClinicById, createClinic, updateClinic }