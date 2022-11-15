const UserService = require("../services/UserService")
const _= require('lodash')
const jwt = require('jsonwebtoken')
module.exports = {
    signUp : async(req,res) =>{
        try{
            let {body} = req
            let user = await UserService.findOne(body.email).catch(e=>{return {}})
            if(!_.isEmpty(user)) throw new Error("email is already in used")
            let createUser = await UserService.create(body)
            res.json({flag:true,data:createUser,message:"user signup successfully"})
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
    },
    signIn : async(req,res) =>{
        try{
            let {body} = req
            let user = await UserService.findOneWithUserNamePassword(body)
            user = _.omit(user,'password')
            console.log(user)
            let token = jwt.sign(user,process.env.JWT_SECRET);
            await UserService.addToken({token})
            res.json({flag:true,data:{
                user,
                token
            }})
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
    },
    myProfile : (req,res) =>{
        try{
            let {user} = req
            res.json({flag:true,data:user})
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
    },
    logout : async(req,res) =>{
        try{
            let {headers} = req
            let authorization = headers.authorization
            authorization = authorization.slice(4) 
            await UserService.deleteToken(authorization)
            res.json({flag:true,message:"user logout successfully"})
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
    }
}