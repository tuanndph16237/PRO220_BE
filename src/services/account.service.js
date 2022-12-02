import { accountServiceModel } from "../models";

export const getAll = async () => {
    return accountServiceModel.find();
};

export const getById = async (_id) => {
    return await accountServiceModel.findOne({ _id }).exec();
};

export const create = async (data) => {
    return await new accountServiceModel(data).save();
};

export const removeById = async (_id) => {
    return await accountServiceModel.findOneAndDelete({ _id }).exec();
};

export const updateById = async (_id, data) => {
    return await accountServiceModel.findOneAndUpdate({ _id }, data, { new: true });
};

export const getEmail = async (data) => {
    return await accountServiceModel.findOne({ email:data });
};