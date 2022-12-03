import mongoose from 'mongoose';
import { BannerModel } from '../models';

export const getAll = async () => {
    return BannerModel.find({ deleted: false });
};

export const getById = async (_id) => {
    return await BannerModel.findOne({ _id, deleted :false }).exec();
};

export const create = async (data) => {
    return await new BannerModel(data).save();
};

export const removeById = async (_id) => {
    const bannerId = mongoose.Types.ObjectId(_id);
   return BannerModel.delete({ _id: bannerId },(err,rs) => {
    if(rs) {
        return getById(_id)
    }
   });
};

export const updateById = async (_id, data) => {
    return await BannerModel.findOneAndUpdate({ _id, deleted: false }, data, { new: true });
};
