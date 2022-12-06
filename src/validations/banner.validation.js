import Joi from 'joi';

export const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        url: Joi.string().required(),
        redirectTo: Joi.string().allow('#'),
        enabled: Joi.boolean().required(),
        priority: Joi.number().required(),
    }),
};
export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export const deleteByIds = {
    body: Joi.object().keys({
        ids: Joi.array().items(Joi.string()),
    }),
};
