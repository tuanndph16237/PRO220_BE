import express from 'express';
import { BannerController } from '../controllers';
import validate from '../middlewares/validate';
import { BannerValidation } from '../validations';

const router = express.Router();

router.get('/banner', BannerController.getAll);
router.get('/banner/:id', validate(BannerValidation.getById), BannerController.getById);
router.post('/banner', validate(BannerValidation.create), BannerController.create);
router.delete('/banner/:id', validate(BannerValidation.getById), BannerController.removeById);
router.delete('/banner', validate(BannerValidation.deleteByIds), BannerController.removeByIds)
router.patch(
    '/banner/:id',
    validate(BannerValidation.create),
    validate(BannerValidation.getById),
    BannerController.updateById,
);
export default router;
