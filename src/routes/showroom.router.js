import express from "express";
import { get } from "mongoose";
import {
    showroomController
} from "../controllers";
import validate from "../middlewares/validate";
import {
    showroomValidation
} from '../validations'


const router = express.Router();

//  grouping of router in route

router.route('/showrooms').get(showroomController.getAll).post(validate(showroomValidation.create), showroomController.create)
router.route('/showrooms/:id').get(validate(showroomValidation.getById), showroomController.getById).delete(validate(showroomValidation.getById), showroomController.removeById).patch(validate(showroomValidation.getById),validate(showroomValidation.updateById), showroomController.updateById)
router.post('/showrooms/user-near-by',validate(showroomValidation.userLocation),showroomController.showroomNearBy)

export default router;