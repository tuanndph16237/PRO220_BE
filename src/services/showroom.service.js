import {
    showroomModel
} from "../models";

export const getAll =  () => {
    return  showroomModel.find();
}

export const getById = (_id) => {
    return showroomModel.findOne({
        _id
    }).exec();
}

export const create = (data) => {
    return new showroomModel(data).save()
}

export const removeById = (_id) => {
    return showroomModel.findOneAndDelete({
        _id
    }).exec()
}

export const updateById = (_id, data) => {
    return showroomModel.findOneAndUpdate({
        _id
    }, data, {
        new: true
    })
}