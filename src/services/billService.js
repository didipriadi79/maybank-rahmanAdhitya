const {user, bills, transaction, category} = require("../lib/sequelize")
const router = require("../routes/category")
const Service = require("./index")

class BillService extends Service{
    static getAllBills = async (req)=>{
        try {
            const getData = await bills.findAll()

            return this.handleSuccess({
                statusCode:200,
                message:"get all bills success",
                data: getData
            })
            
        } catch (err) {
            return this.handleError({})
        }
    }

    static getBillsById = async (req)=>{
        const {id} = req.params
        try {

            const getData = await bills.findByPk(id)

            if(!getData){
                return this.handleError({
                    statusCode:404,
                    message:"bills not found"
                })
            }

            console.log(getData)
            
            return this.handleSuccess({
                statusCode: 200,
                message:"get data by id success",
                data: getData
            })

        } catch (err) {
            return this.handleError({})
        }
    }

    static getBillsByCategoryId = async(req) =>{
        const {category_id} = req.params
        try {
            
            const getData = bills.findAll({
                where:{
                    category_id
                }
            })

            if(getData.length === 0){
                return this.handleError({
                    message:"bills not found",
                    statusCode: 404
                })
            }

            return this.handleSuccess({
                message:"get bills by category success",
                statusCode:200,
                data:getData
            })

        } catch (err) {
            return this.handleError({})
        }
    }

    static inputProduct = async(req)=>{
       const {product_name, description, category_id, price} = req.body
       try {
            const createProduct = await bills.create({
                product_name, 
                price,
                description,
                category_id
            })

            return this.handleSuccess({
                message:"create bills success",
                statusCode:201,
                data:createProduct
            })
       } catch (err) {
        console.log(err)
        return this.handleError({})
        
       }
    }

    static getBillsByCategory = async(req)=>{
        try {

            const findProduct = await category.findOne({
                where:{
                    ...req.query
                }, 
                include:[
                    {model:bills}
                ]
            })
            if(findProduct.length === 0){
                return this.handleError({
                    message:"data not found",
                    statusCode: 404
                })
            }

            return this.handleSuccess({
                message:"get data success",
                data: findProduct,
                statusCode:200
            })
        } catch (err) {
            console.log(err)
            return this.handleError({})
        }
       
    }
}

module.exports = BillService