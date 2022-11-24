const Joi = require("joi")

module.exports = {
    addReceipt : Joi.object({
            category : Joi.string().valid("Entertainment","Transport","Groceries","Shopping","Other").required(),
            title : Joi.string().min(3).max(100).required(),
            cost : Joi.number().min(10).required(),
        }),
        list : Joi.object({
            start : Joi.number(),
            limit : Joi.number()
        })
}