const prisma = require("../db/index")

const getOwnerByEmail = async(email) => {
    const user = await prisma.user.findUnique({
        where:{
            email: email,
        },
        select:{
            id: true,
            name: true,
            email: true,
            role: true,
            password:true
        }
    })
    return user
}

const signup = async(pwHash, newOwner) => {
    const addOwner = await prisma.user.create({
        data:{
            name: newOwner.name,
            email: newOwner.email,
            address: newOwner.address,
            password: pwHash,
            role: newOwner.role
        }
    })
    return addOwner
}

module.exports = {
    getOwnerByEmail,
    signup
}