import mongoose from "mongoose";
const showroomSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    images:[],
    location: {
        type: {
          type: String
        },
        coordinates: []
    },
})
showroomSchema.index({ location: '2dsphere' })

const showroomModel = mongoose.model('showroom', showroomSchema);

module.exports = showroomModel;