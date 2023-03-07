import mongoose, { Schema } from 'mongoose';

const accountSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        number_phone: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        showroomId: {
            default: null,
            type: mongoose.ObjectId,
            ref: 'Showroom',
        },
        roleId: {
            default: null,
            type: mongoose.ObjectId,
            ref: 'Role',
        },
    },
    { timestamps: true },
);
const AccountModel = mongoose.model('Account', accountSchema);
module.exports = AccountModel;
