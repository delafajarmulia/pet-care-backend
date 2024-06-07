const { body } = require("express-validator")

const postCategoryValidation = [
    body('name', 'category name is required').notEmpty().trim()
]

module.exports = { postCategoryValidation }