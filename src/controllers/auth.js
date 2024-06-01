const express = require("express")
const response = require("../response")
const { getOwnerByEmail, signup } = require("../repository/auth")
const { compareSync, hashSync, compare } = require("bcrypt")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// const JWT_SECRET = require("../index")

const router = express.Router()

router.post("/sign-up", async(req, res) => {
    try {
        const newOwner = req.body

        if(newOwner.name.trim().length === 0 || newOwner.email.trim().length === 0 || newOwner.address.trim().length === 0 || newOwner.password.trim().length === 0){
            response(400, newOwner, "some fields are missing", res)
        }

        const ownerAvailabled = await getOwnerByEmail(newOwner.email)
        if(ownerAvailabled.length > 1){
            console.log("ok")
            response(400, ownerAvailabled, 'owner already exists', res)
        }

        const hash = await bcrypt.hash(newOwner.password, 10)
        const owner = await signup(hash, newOwner)
        response(200, owner, "successfully add new owner", res)
    } catch (err) {
        res.send(err.message)
    }
})

router.post("/login", async(req, res) => {
    try {
        const owner = req.body
        const pw = owner.password

        if(owner.email.trim().length === 0 || owner.password.trim().length === 0){
            response(404, owner, "some fields are missing", res)
        }

        const ownerAvailabled = await getOwnerByEmail(owner.email)

        if(ownerAvailabled == null){
            response(404, ownerAvailabled, "owner does not exists", res)
        }
        console.log(ownerAvailabled)

        console.log("cek")
        // const isMatch = bcrypt.compareSync(pw, ownerAvailabled.password)
        // console.log(isMatch)
        // if(!comparePw(pw, ownerAvailabled.password)){
        //     response(400, owner, "incorrect password", res)
        // }

        // console.log("invalid pw")
        // const comparePw = bcrypt.compare(pw, ownerAvailabled.password, function(err, ress){
        //     if(err) console.log(err.stack +err.message + " when compare")//res.send(err.message)
        //     if(ress) console.log("ok")//res.send("ook")
        // })
        
        // console.log(comparePw + " this is")

        // const pwMatch = await bcrypt.compare(pw, ownerAvailabled.password)
        // console.log("the value of pwMatch " +pwMatch)
        // if(pwMatch) console.log("compare")
        // else console.log('not compare')

        const checkPw = await bcrypt.compare(pw, ownerAvailabled.password)
        if(!checkPw){
            res.status(401).send({
                status: 'unauthorized',
                message:'invalid pw',
            })
        }

        const token = jwt.sign({
            id: ownerAvailabled.id
        }, process.env.JWT_SECRET, {expiresIn: "1h"})

        console.log('ok2')
        res.send(token)
    } catch (e) {
        res.send(e.message)
    }
})

const comparePw = async(pw, existingPw) => {
    await bcrypt.compare(pw, existingPw)
}

const pw = '12345'
const hashPw = hashSync(pw, 10)
// const isMatch = await bcrypt.compare('1345', hashPw) 
// // console.log({pw, hashPw})
// console.log(isMatch)

module.exports = router