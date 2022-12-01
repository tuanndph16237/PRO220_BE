import express from 'express';
import { cateServiceController } from '../controllers';
import validate from '../middlewares/validate';
import { cateServiceValidation } from '../validations';

const router = express.Router();

router.get('/cate-service', cateServiceController.getAll);
router.get('/cate-service/:id', validate(cateServiceValidation.getById), cateServiceController.getById);
router.post('/cate-service', validate(cateServiceValidation.createCateService), cateServiceController.create);
router.delete('/cate-service/:id', validate(cateServiceValidation.getById), cateServiceController.removeById);
router.patch(
    '/cate-service/:id',
    validate(cateServiceValidation.createCateService),
    validate(cateServiceValidation.getById),
    cateServiceController.updateById,
);
export default router;
