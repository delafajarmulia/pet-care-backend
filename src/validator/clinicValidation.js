const { body } = require("express-validator")

const clinicValidation = [
    body('petId')
        .isNumeric().withMessage('pet id must be a number')
        .notEmpty().withMessage('pet id is required'),
    body('doctorId')
        .isNumeric().withMessage('doctor id must be a number')
        .notEmpty().withMessage('doctor id is required'),
    body('billAmount')
        .isNumeric().withMessage('bill amount must be a number')
        .notEmpty().withMessage('bill amount is required'),
    body('dateCheck')
        .toDate()//.withMessage('please check again your date check')
        .notEmpty().withMessage('date check is required')
]

module.exports = { clinicValidation }