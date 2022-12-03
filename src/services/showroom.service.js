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
    const dataShowroom = {
        name:data.name,
        phone:data.phone,
        address:data.address,
        images:data.images,
        location: {
            type: 'Point',
            coordinates: [
              parseFloat(data.longitude),
              parseFloat(data.latitude)
            ]
        }
    }
    return new showroomModel(dataShowroom).save()
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