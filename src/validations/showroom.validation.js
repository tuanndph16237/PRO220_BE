import Joi from "joi";

export const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
    })
}

export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}

export const updateById = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
    })
}