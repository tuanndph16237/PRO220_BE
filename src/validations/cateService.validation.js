import Joi from 'joi';

export const createCateService = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};
export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};
