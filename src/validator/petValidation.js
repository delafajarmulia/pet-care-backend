const { body } = require("express-validator")

const petValidation = [
    body('userId')
        .isNumeric().withMessage('user id must be a number')
        .notEmpty().withMessage('user id is requiered'),
    body('categoryId')
        .isNumeric().withMessage('category id must be a number')
        .notEmpty().withMessage('category id is requiered'),
    body('age')
        .isNumeric().withMessage('age must be a number')
        .notEmpty().withMessage('age is requiered'),
    body('name')
        .notEmpty().trim().withMessage('name is required'),
    body('image')
        .notEmpty().trim().withMessage('image is required')
]

module.exports = { petValidation }