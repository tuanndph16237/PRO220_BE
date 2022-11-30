import {
    orderService
} from '../services'

export const getAll = async (req, res) => {
    try {
        const data = await orderService.getAll();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong co don nao'
        })
    }
}


export const getById = async (req, res) => {
    try {
        const data = await orderService.getById(
            req.params.id
        )
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong tim thay don nao'
        })
    }
}


export const create = async (req, res) => {
    try {
        console.log(req.body);
        // const data = await new orderModel(data).save();
        const data = await orderService.create(req.body);
        res.json(data)
    } catch (error) {
        res.status(400).json({
            error: 'khong them duoc'
        })
    }
}


export const removeById = async (req, res) => {

    try {
        const data = await orderService.removeById(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(400).json({
            error: 'khong xoa duoc'
        })
    }
}


export const updateById = async (req, res) => {

    try {
        const data = await orderService.updateById(req.params.id, req.body)
        res.json(data)
    } catch (error) {
        res.status(400).json({
            error: 'khong sua duoc'
        })
    }
}