const prisma = require("../db/index")
const {hashSync, compareSync} = require("bcrypt")
const jwt = require("jsonwebtoken")

const getOwnerByEmail = async(email) => {
    const owner = await prisma.owner.findUnique({
        where:{
            email: email,
        },
    })
    return owner
}

const signup = async(pwHash, newOwner) => {
    const addOwner = await prisma.owner.create({
        data:{
            name: newOwner.name,
            email: newOwner.email,
            address: newOwner.address,
            password: pwHash,
            token:""
        }
    })
    return addOwner
}

module.exports = {
    getOwnerByEmail,
    signup
}