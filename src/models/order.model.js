import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    date: {
        type: Date
    },
    serviceType: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'user',
    },
    cateStore: {
        type: mongoose.ObjectId,
        ref: 'cateStore',
    },
    cateService: {
        type: mongoose.ObjectId,
        ref: 'cateService',
    }
}, {
    timestamps: true
})

// export default mongoose.model('Order', orderSchema) //no cai nay xoa r ma???


const OrderModel = mongoose.model('OrderModel', orderSchema);

module.exports = OrderModel;