import express from 'express';
import { cateServiceController } from '../controllers';
import validate from '../middlewares/validate';
import { cateServiceValidate } from '../validations';

const router = express.Router();

router.get('/cate-service', cateServiceController.getAll);
router.get('/cate-service/:id', validate(cateServiceValidate.getById), cateServiceController.getById);
router.post('/cate-service', validate(cateServiceValidate.createCateService), cateServiceController.create);
router.delete('/cate-service/:id', validate(cateServiceValidate.getById), cateServiceController.removeById);
router.patch(
    '/cate-service/:id',
    validate(cateServiceValidate.createCateService),
    validate(cateServiceValidate.getById),
    cateServiceController.updateById,
);
export default router;
