const prisma = require("../db/index")

const getAllUser = async() => {
    const users = await prisma.user.findMany({
        include:{
            pets:true
        }
    })
    return users
}

const getUserById = async(id) => {
    const user = await prisma.user.findFirst({
        where:{
            id: id,
        },
    })
    return user
}

const deleteUser = async(id) => {
    const user = await prisma.user.delete({
        where:{
            id: id,
        },
        select:{
            id:true
        }
    })
    return user
}

module.exports = {
    getAllUser,
    getUserById,
    deleteUser
}