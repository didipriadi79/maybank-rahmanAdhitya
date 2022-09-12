const router = require("express").Router()
const controllers = require("../controllers/index")
const TransactionService = require("../services/transactionServices")
const {authorizedToken} = require("../middlewares/authMiddleware")

router.post("/", controllers(TransactionService.useServiceProduct))


module.exports = router

