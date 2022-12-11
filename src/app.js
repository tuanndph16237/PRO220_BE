require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import orderRouter from './routes/order.router';
import showroomRouter from './routes/showroom.router';
import ApiError from './utils/ApiError';
import BannerRouter from './routes/banner.router';
import routerMaterials from './routes/materials.router';
import httpStatus from 'http-status';
import routerAccount from './routes/acount.router'
const app = express()
// const app = express();

//parse json request body
app.use(express.json());

//use morgan log info when get data
app.use(morgan('tiny'));

app.use(cors());
app.options('*', cors());

//use routers
app.use('/' , (req,res) => {
    res.json('Hello World')
})

app.use('/api', BannerRouter);

app.use('/api', orderRouter);
app.use('/api',routerAccount)
app.use('/api',showroomRouter)
app.use('/api', routerMaterials);


// parse urlencoded request body
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {                      
    next(new ApiError(httpStatus.NOT_FOUND, 'Không tồn tai api này vui lòng thử lại!'));
});

//conect db
try {
    // connect db atlas ket noi db atlas
    (async () => {
        const url = `mongodb+srv://${process.env.DATABASE}:${process.env.PASSWORD}@cluster0.utwdlzd.mongodb.net/web_app`;
        console.log('URL', url);
        await mongoose.connect(url);
        console.log('CONNECTED SUCCES DB');
    })();
} catch (error) {
    console.log('CONNECTED FAILED', error.message);
}

app.listen(process.env.PORT, () => {
    console.log(`CONNECTED SUCCES PORT ${process.env.PORT}`);
});

module.exports = app