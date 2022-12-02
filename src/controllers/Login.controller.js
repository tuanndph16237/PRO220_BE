// import accountModel from '../models/account.model'
import { accountServices } from '../services'
import bcyrpt from 'bcrypt'

export const login = async (req,res)=>{
    try {
        const checkEmail = await accountServices.getEmail(req.body.email)
        if (!checkEmail) {
            return res.json({
                message:'email chưa tồn tại'
            })
        }
        const comparePassword = bcyrpt.compareSync(req.body.password,checkEmail.password)
        if (!comparePassword) {
            return res.json({
                message:'mật khẩu sai vui lòng nhập lại'
            })
        }
        res.status(200).json({
            message:checkEmail
        })
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}