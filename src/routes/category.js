const router = require("express").Router()
const controllers = require("../controllers/index")
const CategoryService= require("../services/categoryService")

router.get("/", controllers(CategoryService.getAllCategory))
router.post("/new", controllers(CategoryService.createCategories) )



module.exports = router