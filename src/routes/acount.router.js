import { Router } from "express";
import {accountController} from '../controllers'
import { login } from "../controllers/Login.controller";
import validate from "../middlewares/validate";
import { accountValidation } from "../validations";

const router = Router()

router.get('/accounts',accountController.getAll)
router.get('/account/:id',validate(accountValidation.getById),accountController.getById)
router.post('/register',validate(accountValidation.createAccount),accountController.create)
router.delete('/accounts/:id',validate(accountValidation.getById),accountController.removeById)
router.put('/accounts/:id',validate(accountValidation.getById),validate(accountValidation.createAccount),accountController.updateById)
router.post('/login',validate(accountValidation.login),login)

export default router