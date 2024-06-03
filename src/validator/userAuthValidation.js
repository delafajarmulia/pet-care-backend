const { body } = require('express-validator')

const registerValidation = [
    body('name', 'name is required').notEmpty(),
    body('role', 'role is required').notEmpty(),
    body('email', 'please include a valid email')
        .notEmpty()
        .isEmail()
        .normalizeEmail({gmail_remove_dots: true}),
    body('password')
        .notEmpty().withMessage('password is required')
        .isLength({
            min:8,
        }).withMessage('password must be 8 character')
        // .isAlphanumeric()
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/),
]

const loginValidation = [
    body('email', 'please include a valid email')
        .notEmpty()
        .isEmail()
        .normalizeEmail({gmail_remove_dots: true}),
    body('password', 'password must be 8 or more character')
        .notEmpty()
        .isLength({
            min: 8,
        }),
]

module.exports = { registerValidation, loginValidation }