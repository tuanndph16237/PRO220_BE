import Joi from "joi";

export const createOrder = {
    body: Joi.object().keys({
        description: Joi.string().required(),
        serviceType: Joi.string().required(),
        date: Joi.date().required(),
        // user: Joi.string().required(),
        // cateStore: Joi.string().required(),
        // cateService: Joi.string().required(),
    })
}

export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}