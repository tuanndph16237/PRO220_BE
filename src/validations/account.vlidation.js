import Joi from "joi";

export const createAccount = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        number_phone: Joi.number().required(),
        image:Joi.string().required(),
    })
}

export const getById = { 
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}

export const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}