import { cateServiceModel } from '../models';

export const getAll = async () => {
    return cateServiceModel.find();
};

export const getById = async (_id) => {
    return await cateServiceModel.findOne({ _id }).exec();
};

export const create = async (data) => {
    return await new cateServiceModel(data).save();
};

export const removeById = async (_id) => {
    return await cateServiceModel.findOneAndDelete({ _id }).exec();
};

export const updateById = async (_id, data) => {
    return await cateServiceModel.findOneAndUpdate({ _id }, data, { new: true });
};
