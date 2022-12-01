import express from 'express';
import { materialsController } from '../controllers';
import validate from '../middlewares/validate';
import { materialsValidate } from '../validations';

const router = express.Router();

router.get('/materials', materialsController.getAll);
router.get('/materials/:id', validate(materialsValidate.getById), materialsController.getById);
router.post('/materials', validate(materialsValidate.createMaterials), materialsController.create);
router.delete('/materials/:id', validate(materialsValidate.getById), materialsController.removeById);
router.patch(
    '/materials/:id',
    validate(materialsValidate.createMaterials),
    validate(materialsValidate.getById),
    materialsController.updateById,
);
export default router;
