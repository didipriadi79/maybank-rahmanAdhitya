const router = require("express").Router()
const controllers = require("../controllers")
const BillService = require("../services/billService")

router.get("/", controllers(BillService.getAllBills))
router.get("/by/:id", controllers(BillService.getBillsById))
router.post("/new", controllers(BillService.inputProduct))
router.get("/category", controllers(BillService.getBillsByCategory))

module.exports = router
