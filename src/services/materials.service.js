import { materialsModel } from '../models';

export const getAll = async () => {
    return materialsModel.find();
};

export const getById = async (_id) => {
    return await materialsModel.findOne({ _id }).exec();
};

export const create = async (data) => {
    return await new materialsModel(data).save();
};

export const removeById = async (_id) => {
    return await materialsModel.findOneAndDelete({ _id }).exec();
};

export const updateById = async (_id, data) => {
    return await materialsModel.findOneAndUpdate({ _id }, data, { new: true });
};
