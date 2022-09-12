const {transaction, user, bills,merchant, sequelize} = require("../lib/sequelize")
const Service = require("./index")
const {compile, pdfGenerator} = require("../lib/pdf")

class TransactionService extends Service {

    static useServiceProduct = async(req)=>{
        const t = await sequelize.transaction()

        const{bill_id, amount, transaction_detail, customer_id} = req.body
        const user_id = req.token.id
        try {
            const findBillId = await bills.findByPk(bill_id)

            if(!findBillId){
                return this.handleError({
                    message:"bill_id not found, transaction fail",
                    statusCode:404
                })
            }

            const makePayment = await transaction.create({
                bill_id,
                user_id,
                amount,
                transaction_detail,
                customer_id
            })

            const transactionId= makePayment.dataValues.id

            const findTransaction = await transaction.findByPk(transactionId,{
                include:{
                    model:bills,
                    include:{
                        model:merchant
                    }
                }
            })

            const data = findTransaction.dataValues

            if(!makePayment){
                return this.handleError({
                    message:"transaction fail",
                    statusCode:400
                })
            }

            await t.commit()

            return this.handleSuccess({
                statusCode:201,
                message:"transaction success",
                data: findTransaction
                
            })
        } catch (err) {
            console.log(err)
            return this.handleError({})
        }
    }
}


module.exports = TransactionService