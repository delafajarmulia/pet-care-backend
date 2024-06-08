const { param } = require("express-validator")

const numericValidation = [
    param('id')
        .isNumeric().withMessage('id must be a number')
        .notEmpty().withMessage('id is required')
]

module.exports = numericValidation