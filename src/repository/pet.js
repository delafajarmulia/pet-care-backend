const prisma = require("../db/index")

const getALlPet = async() => {
    const pets = await prisma.pet.findMany()
}