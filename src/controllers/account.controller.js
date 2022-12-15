import bcyrpt from 'bcrypt';
import { accountServices } from '../services';

export const getAll = async (req, res) => {
    try {
        const data = await accountServices.getAll();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const checkEmail = await accountServices.getEmail(req.body.email);
        if (checkEmail) {
            return res.json({
                message: 'email đã tồn tại',
            });
        }
        const passwordVerify = bcyrpt.hashSync(req.body.password, 10);
        const data = await accountServices.create({ ...req.body, password: passwordVerify });
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const removeById = async (req, res) => {
    try {
        const data = await accountServices.removeById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const updateById = async (req, res) => {
    try {
        const data = await accountServices.updateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const data = await accountServices.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const register = async (req, res) => {
    try {
        //check exirst number phone
        const checkPhoneNumber = await accountServices.search({ number_phone: req.body.number_phone });
        if (!checkPhoneNumber) {
            const passwordVerify = bcyrpt.hashSync(req.body.password, 10);
            const data = await accountServices.create({ ...req.body, password: passwordVerify });
            return res.status(200).json({ data, message: 'Tạo tài khoản thành công!' });
        }
        res.status(200).json({
            message: 'Tài khoản đã tồn tại trong hệ thống!',
        });
    } catch (error) {
        res.status(400).json({
            error: error,
            message: 'Đăng ký tài khoản thất bại! Vui lòng thử lại.',
        });
    }
};
