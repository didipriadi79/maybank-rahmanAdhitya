const { check, validationResult } = require("express-validator")

exports.registerValidation = [
    check("username").trim().notEmpty().withMessage(" name required")
        .isLength({ min: 5, max: 20 }).withMessage("name must be within 5 to 20 character"),
    check("email").notEmpty().withMessage("email required")
        .isEmail().withMessage("Invalid email address"),
    check("password").notEmpty().withMessage("password required")
        .matches(/^(?=.*?[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*[._]).{8,}$/)
        .withMessage("Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
]


exports.topupValidation = [
    check("amount").trim().notEmpty().withMessage("amount require").isNumeric().withMessage("input must be number")
        .isInt({ max: 1000000, min: 10000 }).withMessage("minimum 10.000 maximum 1.000.000")
]

exports.validator = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next()

    const error = result[0].msg
    return res.status(404).json({
        success: false,
        message: error
    })
}