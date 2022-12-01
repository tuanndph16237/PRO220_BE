import { cateServices } from '../services';
import { orderController } from './cateService.controller';

export const getAll = async (req, res) => {
    try {
        const category = await cateServices.getAll();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            error: 'khong co don nao',
        });
    }
};

export const getById = async (req, res) => {
    try {
        const category = await cateServices.getById(req.params.id);
        // const order = await orderController
        //     .find({ category: category })
        //     .populate('category')
        //     .select('-category')
        //     .exec();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            error: 'khong tim thay don nao',
        });
    }
};

export const create = async (req, res) => {
    try {
        console.log(req.body);
        // const category = await cateServices.create(req.body);
        // res.json(category);
    } catch (error) {
        res.status(400).json({
            error: 'khong them duoc',
        });
    }
};

export const removeById = async (req, res) => {
    try {
        const category = await cateServices.removeById(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(400).json({
            error: 'khong xoa duoc',
        });
    }
};

export const updateById = async (req, res) => {
    try {
        const category = await cateServices.updateById(req.params.id, req.body);
        res.json(category);
    } catch (error) {
        res.status(400).json({
            error: 'khong sua duoc',
        });
    }
};
