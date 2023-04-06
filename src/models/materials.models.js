import mongoose from 'mongoose';
const materialsSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        image: {
            type: String,
        },
        showroomId: {
            type: mongoose.ObjectId,
            ref: 'showroom',
        },
    },
    {
        timestamps: true,
    },
);

const materialsModel = mongoose.model('materials', materialsSchema);
module.exports = materialsModel;
