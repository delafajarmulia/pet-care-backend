const { body } = require("express-validator")

const postUpdateDoctorValidation = [
    body('name', 'name is required').notEmpty(),
    body('specialis', 'specialis is required').notEmpty()
]

module.exports = postUpdateDoctorValidation