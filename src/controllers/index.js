

const controllers = (services)=>{
    return async (req,res)=>{{
        try {
            
            const serviceControllers = await services(req)

            if(!serviceControllers.success){
                throw serviceControllers
            }

            if(serviceControllers.redirect){
                return res.redirect
            }

            return res.status(serviceControllers.statusCode).json({
                message: serviceControllers.message,
                result: serviceControllers.data
            })

        } catch (err) {
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    }}
}


module.exports = controllers