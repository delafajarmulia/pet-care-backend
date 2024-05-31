const prisma = require("../db/index")

const getAllOwner = async() => {
    const owners = await prisma.owner.findMany({
        include:{
            pets:true
        }
    })
    return owners
}

const getOwnerById = async(id) => {
    const owner = await prisma.owner.findFirst({
        where:{
            id: id,
        },
    })
    return owner
}

const getOwnerByEmail = async(email) => {
    const owner = await prisma.owner.findMany({
        where:{
            email: email,
        },
    })
    return owner
}

const createOwner = async(newOwner) => {
    const addOwner = await prisma.owner.create({
        data:{
            name: newOwner.name,
            email: newOwner.email,
            address: newOwner.address,
        }
    })
    return addOwner
}

const deleteOwner = async(id) => {
    const owner = await prisma.owner.delete({
        where:{
            id: id,
        },
    })
    return
}

module.exports = {
    getAllOwner,
    getOwnerById,
    getOwnerByEmail,
    createOwner,
    deleteOwner
}