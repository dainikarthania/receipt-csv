const db = require('../db')
const _ = require('lodash')
module.exports = {
    findOne : (email) =>{
        return db.user.findOne({where:{email}}).then(value=>{
            if(_.isEmpty(value)) throw new Error("user not found")
            else{
                return value.toJSON()
            }
        })
    },
    create : (fields) =>{
        return db.user.create(fields).then(value=>{
            if(_.isEmpty(value)) throw new Error("failed to create user")
            else{
                return value.toJSON()
            }
        })
    },
    findOneWithUserNamePassword : (fields) =>{
        return db.user.findOne({where:fields}).then(value=>{
            if(_.isEmpty(value)) throw new Error("user not found")
            else{
                return value.toJSON()
            }
        })
    },
    addToken : (fields) =>{
        return db.token.create(fields).then(value=>{
            if(_.isEmpty(value)) throw new Error("failed to create token")
            else{
                return value.toJSON()
            }
        })
    },
    findOneToken : (token) =>{
        return db.token.findOne({where:{token}}).then(value=>{
            if(_.isEmpty(value)) throw new Error("token not found")
            else{
                return value.toJSON()
            }
        })
    },
    deleteToken : (token) =>{
        return db.token.destroy({where:{token}})
    },
}