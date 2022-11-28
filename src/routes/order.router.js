import express from "express";
import {
    orderController
} from "../controllers";
import validate from "../middlewares/validate";
import {
    orderValidation
} from '../validations'


const router = express.Router();

router.get('/orders', orderController.getAll)
router.get('/orders/:id', validate(orderValidation.getById), orderController.getById)
router.post('/orders', validate(orderValidation.createOrder), orderController.create)
router.delete('/orders/:id', validate(orderValidation.getById), orderController.removeById)
router.patch('/orders/:id', validate(orderValidation.createOrder), validate(orderValidation.getById), orderController.updateById)


export default router;