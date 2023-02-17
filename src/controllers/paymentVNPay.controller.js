import dateFormat from 'dateformat';
import queryStrings from 'qs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const Payment = async (req, res) => {
    const { amount, bankCode, orderInfo, orderType, locale = 'vn',idOrder } = req.body;
    const ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    const date = new Date();
    const createDate = dateFormat(date, 'yyyymmddHHmmss');
    const orderId = dateFormat(date, 'HHmmss');
    const currCode = 'VND';
    let vnpUrl = process.env.VNP_URL;
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = process.env.VNP_TMNCODE;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = +amount * 100;
    vnp_Params['vnp_ReturnUrl'] = `http://localhost:3000/admin/don-hang/${idOrder}`;
    vnp_Params['vnp_IpAddr'] = '14.248.101.1';
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    vnp_Params = sortObject(vnp_Params);
    // console.log('vnp_Params', vnp_Params);
    const signData = queryStrings.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + queryStrings.stringify(vnp_Params, { encode: false });
    return res.json(vnpUrl);
};

export const vnpayReturn = (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = process.env.VNP_TMNCODE;
    var secretKey = process.env.VNP_HASHSECRET;

    var signData = queryStrings.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    if (secureHash === signed) {
        AppResponse.success(req, res)({ code: vnp_Params['vnp_ResponseCode'], result: vnp_Params });
    } else {
        AppResponse.success(req, res, 97)(null);
    }
};

export const vnpay_Ipn = (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = process.env.VNP_HASHSECRET;
    var signData = queryStrings.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        res.status(200).json({ RspCode: '00', Message: 'success' });
    } else {
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
};

export const SendMail = async (req, res) => {
    console.log(req.body);
    
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: { 
    //         user: 'huyndph14652@fpt.edu.vn',
    //         pass: 'upphlixzjrebbmxz',
    //     },
    //     tls: {
    //         rejectUnauthorized: false,
    //     },
    // });
    // const option = {
    //     from: 'huyndph14652@fpt.edu.vn',
    //     to: 'huynguyenz2002@gmail.com',
    //     subject: 'ok',
    //     html: ` 
    //         <div style="width: 100%; background: #f2f2f2; position: relative; padding: 30px">
    //             <div style="padding: 20px; width: 600px; background: white">
    //                 <div>
    //                     <div style="display: flex">
    //                         <img
    //                             style="width: 50px"
    //                             src="https://res.cloudinary.com/df6zs06nu/image/upload/v1676394303/myLogo_nxb70g.png"
    //                             alt=""
    //                         />
    //                         <p style="margin-left: 10px; font-weight: 800; color: #02b875; font-family: sans-serif">
    //                             DODORIS
    //                         </p>
    //                     </div>
    //                     <p>- Xin chào quý khách,</p>
    //                     <p>
    //                         - Dịch vụ sửa xe Dodoris rất vui thông báo đơn hàng #479905473 của quý khách đã được giao thành
    //                         công ngày 02/02/2023.
    //                     </p>
    //                     <p>- Dịch vụ : Bảo dưỡng tại cửa hàng</p>
    //                     <p>- Thông tin chi tiết đơn hàng :</p>
    //                 </div>
    //                 <table border="1">
    //                     <thead>
    //                         <tr>
    //                             <th><span style="padding: 10px;display: block;">STT</span></th>
    //                             <th><span style="padding: 10px;display: block;">Tên Sản Phẩm</span></th>
    //                             <th><span style="padding: 10px;display: block;">Số lượng</span></th>
    //                             <th><span style="padding: 10px;display: block;">Giá</span></th>
    //                             <th><span style="padding: 10px;display: block;">Tổng Giá</span></th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         <tr>
    //                             <td><span style="padding: 10px;display: block;">1</span></td>
    //                             <td><span style="padding: 10px;display: block;">Nhông sên dĩa DID Dream AD3 </span></td>
    //                             <td><span style="padding: 10px;display: block;"> 3 </span></td>
    //                             <td><span style="padding: 10px;display: block;"> 200.000 </span></td>
    //                             <td><span style="padding: 10px;display: block;"> 600.000 </span></td>
    //                         </tr>
    //                         <tr>
    //                             <td><span style="padding: 10px;display: block;">2</span></td>
    //                             <td><span style="padding: 10px;display: block;">Bộ nồi sau tăng tốc Josho1 xe SH, PCX, Air Blade, Lead, Vision, Dylan</span></td>
    //                             <td><span style="padding: 10px;display: block;"> 2 </span></td>
    //                             <td><span style="padding: 10px;display: block;"> 100.000 </span></td>
    //                             <td><span style="padding: 10px;display: block;"> 200.000 </span></td>
    //                         </tr>
    //                         <tr>
    //                             <td colspan="5">
    //                                 <span style="padding: 10px;display: block;">Tổng Đơn Hàng : 800.000 VNĐ</span>
    //                             </td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //                 <p>- Cảm ơn quý khách đã tin tưởng dịch vụ sửa chữa DODORIS</p>
    //             </div>
    //         </div>
    //     `,
    // };
    // return transporter.sendMail(option, (err, info) => {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     res.json({ status: info.response });
    // });
};

function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
