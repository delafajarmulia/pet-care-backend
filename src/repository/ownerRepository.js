const prisma = require("../db/index")

const getAllOwner = async() => {
    const owners = await prisma.user.findMany({
        include:{
            pets:true
        }
    })
    return owners
}

const getOwnerById = async(id) => {
    const owner = await prisma.user.findFirst({
        where:{
            id: id,
        },
    })
    return owner
}

const deleteOwner = async(id) => {
    const owner = await prisma.user.delete({
        where:{
            id: id,
        },
    })
    return
}

module.exports = {
    getAllOwner,
    getOwnerById,
    deleteOwner
}