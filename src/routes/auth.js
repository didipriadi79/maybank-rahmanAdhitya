const router = require("express").Router()
const controllers = require("../controllers")
const AuthService = require("../services/authservice")

router.post("/register", controllers(AuthService.register))
router.post("/login", controllers(AuthService.login))


module.exports = router