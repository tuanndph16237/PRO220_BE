import _ from 'lodash';
import mongoose from 'mongoose';
import { BannerModel } from '../models';

export const getAll = async (filter = { deleted: false }) => {
    return BannerModel.find({ ...filter });
};

export const getById = async (_id, filter = { deleted: false }) => {
    return BannerModel.findOne({ _id, ...filter }).exec();
};

export const create = async (data) => {
    return await new BannerModel(data).save();
};

export const removeById = async (_id, filter = { deleted: false }) => {
    const bannerId = mongoose.Types.ObjectId(_id);
    return BannerModel.delete({ _id: bannerId, ...filter });
};

export const removeByIds = async (ids = []) => {
    const result = ids.map(async (id) => {
        //get ra data byid deleted : false just handle
        const bannerById = await getById(id);
        if (!_.isEmpty(bannerById)) {
            removeById(id);
        }
    });
    return result;
};

export const updateById = async (_id, data) => {
    return await BannerModel.findOneAndUpdate({ _id, deleted: false }, data, { new: true });
};
