const prisma = require("./index")

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

module.exports = {
    getAllOwner,
    getOwnerById
}