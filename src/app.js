require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import ApiError from './utils/ApiError';
import routercateService from './routes/cateService.router';
import orderRouter from './routes/order.router';
import httpStatus from 'http-status';
const app = express();

//parse json request body
app.use(express.json());

//use morgan log info when get data
app.use(morgan('tiny'));

app.use(cors());
app.options('*', cors());

//use routers
app.use('/api', orderRouter);

// parse urlencoded request body
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//     next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// use routers
// app.use('/api', routes);
app.use('/api', routercateService);

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
