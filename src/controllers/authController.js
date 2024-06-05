const express = require("express")
const response = require("../response")
const { getOwnerByEmail, signup } = require("../repository/authRepository")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { registerValidation, loginValidation } = require("../validator/userAuthValidation")
const { validationResult } = require("express-validator")

const router = express.Router()

router.post("/sign-up", registerValidation, async(req, res) => {
    try {
        const newOwner = req.body

        // if(newOwner.name.trim().length === 0 || newOwner.email.trim().length === 0 || newOwner.address.trim().length === 0 || newOwner.password.trim().length === 0){
        //     return response(400, newOwner, "some fields are missing", res)
        // }
        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            // jika ada error 
            return res.status(422).json({
                success: false,
                message: "validation error",
                errors: errorCheckValidation.array(),
            })
        }

        const ownerAvailabled = await getOwnerByEmail(newOwner.email)
        if(ownerAvailabled){
            return response(400, [], 'owner already exists', res)
        }

        const hash = await bcrypt.hash(newOwner.password, 10)
        const owner = await signup(hash, newOwner)
        response(200, owner, "successfully add new owner", res)
    } catch (err) {
        res.send(err.message)
    }
})

router.post("/login", loginValidation, async(req, res) => {
    try {
        const owner = req.body
        const pw = owner.password

        // if(owner.email.trim().length === 0 || owner.password.trim().length === 0){
        //     return response(404, owner, "some fields are missing", res)
        // }

        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                status: false,
                message: 'validation error',
                errors: errorCheckValidation.array(),
            })
        }

        const ownerAvailabled = await getOwnerByEmail(owner.email)

        if(!ownerAvailabled){
            return response(404, ownerAvailabled, "owner does not exists", res)
        }

        const checkPw = await bcrypt.compare(pw, ownerAvailabled.password)
        if(!checkPw){
            return res.status(401).json({
                status: 'unauthorized',
                message:'invalid pw',
            })
        }

        const payload = {
            id: ownerAvailabled.id,
            email: ownerAvailabled.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"}) // 1h -> 1 jam, kalo semisal .env nya gak kebaca, ubah jadi proccess.env.JWT_SECRET!

        res.status(201).json({
            success: true,
            message: 'login successfully',
            data:{
                user: ownerAvailabled,
                token: token
            }
        })
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = router