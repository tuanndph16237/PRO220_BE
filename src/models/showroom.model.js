import mongoose from "mongoose";
const showroomSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    }
})
const showroomModel = mongoose.model('showroom', showroomSchema);

module.exports = showroomModel;