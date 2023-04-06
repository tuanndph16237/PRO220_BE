import {
    OrderModel
} from "../models";

export const getAll = async () => {
    return await OrderModel.find();
}

export const getById = async (_id) => {
    return await OrderModel.findOne({
        _id
    }).exec();
}

export const create = async (data) => {
    return await new OrderModel(data).save()
}

export const removeById = async (_id) => {
    return await OrderModel.findOneAndDelete({
        _id
    }).exec()
}

export const updateById = async (_id, data) => {
    return await OrderModel.findOneAndUpdate({
        _id
    }, data, {
        new: true
    })
}