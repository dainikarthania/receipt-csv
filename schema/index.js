const userSchema = require('./userSchema')

module.exports = (schemaName) =>{
     //! If validator is not exist, throw err
     if(!userSchema.hasOwnProperty(schemaName))
     throw new Error(`'${schemaName}' validator is not exist`)

     return async (req,res,next) =>{
        try{
            const validated = userSchema[schemaName].validate(req.body)
            if(validated.error) return res.json({flag:false,message:validated.error})
            next()
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
     }
}