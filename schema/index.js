const Schema = require('./Schema')

module.exports = (schemaName) =>{
     //! If validator is not exist, throw err
     if(!Schema.hasOwnProperty(schemaName))
     throw new Error(`'${schemaName}' validator is not exist`)

     return async (req,res,next) =>{
        try{
            const validated = Schema[schemaName].validate(req.body)
            if(validated.error) return res.json({flag:false,message:validated.error})
            next()
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
     }
}