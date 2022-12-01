import mongoose from 'mongoose';
const cateServiceSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const cateServiceModel = mongoose.model('cateService', cateServiceSchema);
module.exports = cateServiceModel;
