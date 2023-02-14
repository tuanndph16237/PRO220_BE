import { Router } from 'express';
import { Payment, vnpayReturn, vnpay_Ipn } from '../controllers/paymentVNPay.controller';

const routerPayment = Router();

routerPayment.post('/create_payment_url',Payment)
routerPayment.get('/vnpay_return',vnpayReturn)
routerPayment.get('/vnpay_ipn',vnpay_Ipn)

export default routerPayment