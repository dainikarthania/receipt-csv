const Joi = require("joi")

module.exports = {
    signUp : Joi.object({
            first_name : Joi.string().min(3).max(100).required(),
            last_name : Joi.string().min(3).max(100).required(),
            password : Joi.string().min(6).max(12).required(),
            email : Joi.string().pattern(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            ).required(),
        }),
    signIn : Joi.object({
            password : Joi.string().min(6).max(12).required(),
            email : Joi.string().pattern(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            ).required(),
        })
}