const db = require('../db')
const _ = require('lodash')
const moment = require('moment')
module.exports = {
    findOne : (id) =>{
        return db.receipt.findOne({where:{id}}).then(value=>{
            if(_.isEmpty(value)) throw new Error("receipt not found")
            else{
                return value.toJSON()
            }
        })
    },
    create : (fields) =>{
        return db.receipt.create(fields).then(value=>{
            if(_.isEmpty(value)) throw new Error("failed to create receipt")
            else{
                return value.toJSON()
            }
        })
    },
    findAll : (fields) =>{
        let cond = {}

        if(fields.limit){
            cond.limit = fields.limit
        }
        if(fields.start){
            cond.offset = fields.start
        }
        
        return db.receipt.findAll(cond).then(value=>{
            if(_.isEmpty(value)) throw new Error("receipt not found")
            else{
                value = value.map(v=>{
                    return v.toJSON()
                })
                return value
            }
        })
    },
    findAllForReport : (fields) =>{    
        console.log(fields)
        let {Sequelize} = db
        let {Op} = Sequelize

        return db.receipt.findAll({where:{createdAt:{[Op.gt]:fields.createdAt}}}).then(value=>{
            if(_.isEmpty(value)) throw new Error("receipt not found")
            else{
                value = value.map(v=>{
                    return v.toJSON()
                })
                return value
            }
        })
    },
}