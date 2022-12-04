var mongoose_delete = require('mongoose-delete');
import mongoose from 'mongoose';
const bannerSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        url: {
            type: String,
        },
        redirectTo: {
            type: String,
            default : '#'
        },
        priority: {
            type: Number,
        },
        enabled: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    },
);


bannerSchema.plugin(mongoose_delete);

const BannerModel = mongoose.model('banner', bannerSchema);

module.exports = BannerModel;
