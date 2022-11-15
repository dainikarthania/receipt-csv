const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')

module.exports = {
    authorize : async(req,res,next) =>{
        try{
            let {headers} = req
            let authorization = headers.authorization
            authorization = authorization.slice(4)
            await UserService.findOneToken(authorization)
            let decodedToken = jwt.verify(authorization,process.env.JWT_SECRET)
            await UserService.findOne(decodedToken.email)
            req.user = decodedToken

            next()
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
        
    }
}