//validate 
const joi = require('@hapi/joi')

//register validation
const registerValidation = data =>{
    const schema = {
    fullname: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
    mobile: joi.string().required()

    }
    return joi.validate(data,schema)
}

//login validation
const loginValidation = data =>{
    const schema = {
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()

    }
    return joi.validate(data,schema)
}

//email validation
const passValidation = data =>{
    const schema ={
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data,schema)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.passValidation = passValidation

