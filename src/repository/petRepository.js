const prisma = require("../db/index")

const getAllPet = async() => {
    const pets = await prisma.pet.findMany()
    return pets
}

const getPetById = async(id) => {
    const pet = await prisma.pet.findUnique({
        where:{
            id:id
        },
        include:{
            user:true,
            category:true
        }
    })
    return pet
}

const getPetByName = async(name) => {
    const pets = await prisma.pet.findMany({
        where:{
            name: {
                contains:name
            }
        }
    })
    return pets
}

const createPet = async(petData) => {
    const pet = await prisma.pet.create({
        data:{
            userId:petData.userId,
            categoryId:petData.categoryId,
            name: petData.name,
            age:petData.age,
            image:petData.image,
        }
    })
    return pet
}

const updatePet = async(id, petData) => {
    const pet = await prisma.pet.update({
        where:{
            id:id,
        },
        data:{
            userId:petData.userId,
            categoryId:petData.categoryId,
            name: petData.name,
            age:petData.age,
            image:petData.image,
        },
    })
    return pet
}

module.exports = {
    getAllPet,
    getPetById,
    getPetByName,
    createPet,
    updatePet
}