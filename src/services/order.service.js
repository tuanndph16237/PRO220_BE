import {
    Order
} from "../models";

export const getAll = async () => {
    return Order.find();
}

export const getById = async (_id) => {
    return Order.findOne({
        _id
    }).exec();
}

export const create = async (data) => {
    return new Order(data).save();
}

export const removeById = async (_id) => {
    return Order.findOneAndDelete({
        _id
    }).exec()
}

export const updateById = async (_id, data) => {
    return Order.findOneAndUpdate({
        _id
    }, data, {
        new: true
    })
}