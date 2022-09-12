const {category} = require("../lib/sequelize")
const Services = require("./index")

class CategoryService extends Services{
    static createCategories = async(req)=>{
        const category_name = req.body
        
        try {
            const createData = await category.create(
                category_name
            ) 
            
            if(!createData){
                return this.handleError({
                    message:"crate category fail"
,                   statusCode:400
                })
            }

            return this.handleSuccess({
                message:"create categories success",
                statusCode:201,
                data: createData
            })

        } catch (err) {
            console.log(err)
            return this.handleError({})
        }
    }

    static getAllCategory = async(req)=>{
        try {
            const getData = await category.findAll()

            if(!getData.length){
                return this.handleError({
                    message:"get data fail",
                    statusCode:400
                })
            }

            return this.handleSuccess({
                message:"get All Category Success",
                statusCode:200,
                data:getData
            })
        } catch (err) {
            return this.handleError({})
        }
    }

    
}

module.exports= CategoryService